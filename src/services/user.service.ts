import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException
} from "@nestjs/common";
import {
  AddUserDTO,
  ResetPasswordDTO,
  SearchParamsUserDTO,
  UpdateUserDTO,
  ValidateUserDTO
} from "@validations";
import {
  Job,
  JobDocument,
  Role,
  SubTest,
  SubTestDocument,
  TokenClass,
  User,
  UserDocument
} from "@entities";
import { RoleService } from "./role.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import { UserModel } from "@models";
import { paginationResponse } from "@common";
import { MailerService } from "@nestjs-modules/mailer";
import { uuidv4 } from "@utils";
import { generate } from "generate-password";
import { RecipientService } from "./recipient.service";
import axios from "axios";
import https from "https";
import { AxiosExchange } from "../config/axios";

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(RoleService) private readonly roleService: RoleService,
    @Inject(RecipientService)
    private readonly recipientService: RecipientService,
    @InjectModel(SubTest.name) private subTestModel: Model<SubTestDocument>,
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
    private configService: ConfigService,
    private mailerService: AxiosExchange
  ) {}

  async cryptPassword(password: string): Promise<string> {
    return bcrypt.hash(
      password,
      Number(this.configService.get("SALTORROUNDS"))
    );
  }

  async addUser(user: AddUserDTO): Promise<User> {
    const userToSave: User = new User();

    const subTestFound: SubTest = await this.subTestModel.findById(
      user.subTestId
    );
    if (!subTestFound) {
      throw new NotFoundException(`The subtest does not exist`);
    }

    userToSave.subTestId = subTestFound;

    const role: Role = await this.roleService.getRoleByName(user.role);

    if (!role) {
      throw new NotFoundException(`The role of name ${user.role} is not found`);
    }

    const userFound: User = await this.userModel.findOne({
      $or: [{ email: user.email }, { phone: user.phone }]
    });

    if (userFound) {
      throw new ConflictException("User already exist");
    }
    const jobFound: Job = await this.jobModel.findById(user.jobId);
    if (!jobFound) {
      throw new NotFoundException(`The job is not found`);
    }

    userToSave.name = user.name;
    userToSave.password = await this.cryptPassword(user.password);
    userToSave.phone = user.phone;
    userToSave.email = user.email;
    userToSave.role = role;
    userToSave.job = jobFound;

    const tokenToSave = new TokenClass();
    tokenToSave.tokenId = uuidv4();
    tokenToSave.date = new Date(Date.now() + 3600 * 1000 * 24);

    userToSave.token = tokenToSave;
    const createdUser = new this.userModel(userToSave);
    const userSaved: User = await createdUser.save();

    this.sendEmailForCreateAccount(userSaved.email, userSaved.token.tokenId);

    return userSaved;
  }

  async getAll(search: SearchParamsUserDTO, page: number, size: number) {
    const queryUser = {};

    if (search.name && search.name.length) {
      queryUser["$text"] = { $search: search.name };
    }
    if (search.phone && search.phone.length) {
      queryUser["phone"] = { $eq: search.phone };
    }
    if (search.email && search.email.length) {
      queryUser["$text"] = { $search: search.email };
    }
    if (search.role && search.role.length) {
      queryUser["role"] = { $eq: search.role };
    }
    if (search.job && search.job.length) {
      queryUser["job"] = { $eq: search.job };
    }
    const totalItems = await this.userModel.find(queryUser).countDocuments();
    const searchResult = await this.userModel
      .find(queryUser)
      .sort({ createdAt: -1 })
      .skip((page - 1) * size)
      .limit(size);

    const result = await Promise.all(
      searchResult.map(async data => {
        const model = new UserModel(data);
        return model.getResource();
      })
    );

    return paginationResponse(page, size, result, totalItems);
  }

  async getUserById(id: String) {
    const userFound: User = await this.userModel.findById(id);
    if (!userFound) {
      throw new NotFoundException(`User already exist`);
    }

    const userModel: UserModel = new UserModel(userFound);
    return userModel.getResource();
  }

  async updateUser(id: String, updateDTO: UpdateUserDTO) {
    const userFound: User = await this.userModel.findById(id);
    if (!userFound) {
      throw new NotFoundException(`User already exist`);
    }

    const role: Role = await this.roleService.getRoleById(updateDTO.role);
    if (!role) {
      throw new NotFoundException(
        `The role of id ${updateDTO.role} is not found`
      );
    }

    if (updateDTO.email) {
      userFound.email = updateDTO.email;
    }
    if (updateDTO.name) {
      userFound.name = updateDTO.name;
    }
    if (updateDTO.phone) {
      userFound.phone = updateDTO.phone;
    }
    if (updateDTO.role) {
      userFound.role = role;
    }
    if (typeof updateDTO.isVerified === "boolean") {
      userFound.isVerified = updateDTO.isVerified;
    }
    const userSaved: User = await new this.userModel(userFound).save();

    const userModel: UserModel = new UserModel(userSaved);

    return userModel.getResource();
  }

  async sendEmailForCreateAccount(email: string, token: string) {
    await this.mailerService.instance().post(
      "https://notification.dpworld.sn/SendEmail",
      {
        Emetteur: "testpsycho@dpworld.sn",
        Destinataire: email,
        Subject: "Verify mail",
        Message: `Hello,\nIf you want to validate your account please click on this link ${this.configService.get(
          "HOST_CONFIRM_EMAIL"
        ) +
          email +
          "/" +
          token}.\nIf you are not the originator of this request please ignore this message.\n\n Best Regards.`
      },
      {
        auth: {
          username: "testpsychohr",
          password: "t$stHR@2023Psych0"
        }
      }
    );

    /*await this.mailerService.sendMail({
          to: email,
          subject: "Verify mail",
          text: `Hello,\nIf you want to validate your account please click on this link ${this.configService.get(
            "HOST_CONFIRM_EMAIL"
          ) +
            email +
            "/" +
            token}.\nIf you are not the originator of this request please ignore this message.\n\n Best Regards.`
        });*/
  }

  async sendEmailPassword(email, password) {
    await this.mailerService.instance().post(
      "https://notification.dpworld.sn/SendEmail",
      {
        Emetteur: "testpsycho@dpworld.sn",
        Destinataire: email,
        Subject: "Password Change",
        Message: `Hello,\nA new password is generate for you. The password is: ${password}\nIf you are not the originator of this request please ignore this message.\n\nBest Regards.`
      },
      {
        auth: {
          username: "testpsychohr",
          password: "t$stHR@2023Psych0"
        }
      }
    );
  }

  async validateUser(validateUserDTO: ValidateUserDTO) {
    const userFound: User = await this.userModel.findOne({
      email: validateUserDTO.email
    });
    if (!userFound) {
      throw new ConflictException("User not exist");
    }
    const otpExpireDate = new Date(userFound.token.date);
    const nowDate = new Date();
    const checkDate = otpExpireDate > nowDate;
    if (!checkDate) {
      throw new BadRequestException(`The token is expired.`);
    }
    if (userFound.token.tokenId !== validateUserDTO.tokenId) {
      throw new BadRequestException(`Your token is invalid.`);
    }
    userFound.isVerified = true;

    const userToSave = new this.userModel(userFound);
    const userSaved = await userToSave.save();
    const userModel = new UserModel(userSaved);
    return userModel.getResource();
  }

  getToken(getTokenDTO: ResetPasswordDTO) {
    return Promise.resolve(undefined);
  }

  async resetPassword(resetPasswordDTO: ResetPasswordDTO) {
    const userFound: User = await this.userModel.findOne({
      email: resetPasswordDTO.email
    });
    if (!userFound) {
      throw new ConflictException("User not exist");
    }
    const password = generate({ length: 10, uppercase: false });

    userFound.password = await this.cryptPassword(password);

    const userToSave = new this.userModel(userFound);
    const userSaved: User = await userToSave.save();

    this.sendEmailPassword(userSaved.email, password);

    const userModel = new UserModel(userSaved);

    return userModel.getResource();
  }

  async deleteById(id: String) {
    const userFound: User = await this.userModel.findById(id);
    if (!userFound) {
      throw new ConflictException("User not exist");
    }
    // Delete test
    await this.recipientService.findByUserAndDelete(userFound._id);
    return this.userModel.findOneAndRemove({ _id: id });
  }
}
