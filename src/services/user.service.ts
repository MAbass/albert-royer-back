import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { AddUserAndRecipientDTO, AddUserDTO } from "@validations";
import {
  Recipient,
  RecipientDocument,
  Role,
  User,
  UserDocument
} from "@entities";
import { RoleService } from "./role.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Recipient.name)
    private recipientModel: Model<RecipientDocument>,
    @Inject(RoleService)
    private readonly roleService: RoleService
  ) {}

  async addUser(user: AddUserDTO): Promise<User> {
    const userSaved: User = new User();
    userSaved.username = user.username;
    userSaved.password = user.password;
    userSaved.phone = user.phone;

    const role: Role = await this.roleService.getRoleByName(user.role);

    if (!role) {
      throw new NotFoundException(`The role of name ${user.role} is not found`);
    }
    userSaved.role = role;
    const createdUser = new this.userModel(userSaved);
    return createdUser.save();
  }

  async addUserAndRecipient(userRecipient: AddUserAndRecipientDTO) {
    const userSaved = await this.addUser(userRecipient);
    const recipientToSave = new Recipient();
    recipientToSave.firstname = userRecipient.firstname;
    recipientToSave.lastname = userRecipient.lastname;
    recipientToSave.user = userSaved;
    const recipientSaved = new this.recipientModel(recipientToSave);
    return recipientSaved.save();
  }
}
