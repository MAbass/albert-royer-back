import { Body, Controller, Post } from "@nestjs/common";
import { AddUserDTO } from "@validations";
import { UserService } from "@services";
import { User } from "@entities";
import { UserModel } from "@models";

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("")
  async addUser(@Body() user: AddUserDTO): Promise<any> {
    const userSaved: User = await this.userService.addUser(user);
    const userModel = new UserModel(userSaved);
    return userModel.getResource();
  }
}
