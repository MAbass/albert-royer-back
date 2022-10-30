import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException
} from "@nestjs/common";
import { AddUserDTO } from "@validations";
import { Role, SubTest, SubTestDocument, User, UserDocument } from "@entities";
import { RoleService } from "./role.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";

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
}
