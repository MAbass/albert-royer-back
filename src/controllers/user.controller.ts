import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import {
  AddUserDTO,
  PaginationParams,
  SearchParamsUser,
  UpdateUserDTO
} from "@validations";
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

  @Get("")
  async getUsers(@Query() { page, size, search }: PaginationParams) {
    const parseSearch: SearchParamsUser = JSON.parse(search);
    return this.userService.getAll(parseSearch, page, size);
  }

  @Get("/:id")
  async getUserById(@Param("id") id: String) {
    return this.userService.getUserById(id);
  }

  @Put("/:id/update")
  async updateUser(@Param("id") id: String, @Body() updateDTO: UpdateUserDTO) {
    return this.userService.updateUser(id, updateDTO);
  }
}
