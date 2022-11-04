import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException
} from "@nestjs/common";
import { AddUserDTO, SearchParamsUser, UpdateUserDTO } from "@validations";
import { Role, SubTest, SubTestDocument, User, UserDocument } from "@entities";
import { RoleService } from "./role.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import { UserModel } from "@models";
import { paginationResponse } from "@common";

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(RoleService)
    private readonly roleService: RoleService,
    @InjectModel(SubTest.name) private subTestModel: Model<SubTestDocument>,
    private configService: ConfigService
  ) {}

  async cryptPassword(password: string): Promise<string> {
    return bcrypt.hash(
      password,
      Number(this.configService.get("SALTORROUNDS"))
    );
  }

  async addUser(user: AddUserDTO): Promise<User> {
    const userSaved: User = new User();
    userSaved.name = user.name;
    userSaved.password = await this.cryptPassword(user.password);
    userSaved.phone = user.phone;
    userSaved.email = user.email;

    const subTestFound: SubTest = await this.subTestModel.findById(
      user.subTestId
    );
    if (!subTestFound) {
      throw new NotFoundException(`Ce sous-test n'existe pas`);
    }

    userSaved.subTestId = subTestFound;

    const role: Role = await this.roleService.getRoleByName(user.role);

    if (!role) {
      throw new NotFoundException(`The role of name ${user.role} is not found`);
    }
    const userFound: User = await this.userModel.findOne({
      $or: [{ email: userSaved.email }, { phone: userSaved.phone }]
    });

    if (userFound) {
      throw new ConflictException("Cet utilisateur existe déjà");
    }

    userSaved.role = role;
    const createdUser = new this.userModel(userSaved);
    return createdUser.save();
  }

  async getAll(search: SearchParamsUser, page: number, size: number) {
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
      throw new NotFoundException(`Cet utilisateur n'existe pas`);
    }

    const userModel: UserModel = new UserModel(userFound);
    return userModel.getResource();
  }

  async updateUser(id: String, updateDTO: UpdateUserDTO) {
    const userFound: User = await this.userModel.findById(id);
    if (!userFound) {
      throw new NotFoundException(`Cet utilisateur n'existe pas`);
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
    const userSaved: User = await new this.userModel(userFound).save();
    const userModel: UserModel = new UserModel(userSaved);

    return userModel.getResource();
  }
}
