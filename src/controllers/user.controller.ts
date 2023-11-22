import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from "@nestjs/common";
import {
  AddUserDTO,
  PaginationParams,
  SearchParamsUserDTO,
  ResetPasswordDTO,
  UpdateUserDTO,
  ValidateUserDTO
} from "@validations";
import { UserService } from "@services";
import { User } from "@entities";
import { UserModel } from "@models";
import { JwtAuthGuard } from "../services/guards/jwt-auth.guard";

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
  @UseGuards(JwtAuthGuard)
  async getUsers(@Query() { page, size, search }: PaginationParams) {
    const parseSearch: SearchParamsUserDTO = JSON.parse(search);
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

  @Post("/confirm-email")
  async validateUser(@Body() validateUserDTO: ValidateUserDTO) {
    return this.userService.validateUser(validateUserDTO);
  }

  @Post("/reset-password")
  async resetPassword(@Body() resetPasswordDTO: ResetPasswordDTO) {
    return this.userService.resetPassword(resetPasswordDTO);
  }

  @Delete("/:id")
  async deleteById(@Param("id") id: String) {
    return this.userService.deleteById(id);
  }
}
