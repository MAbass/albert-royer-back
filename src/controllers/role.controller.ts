import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AddRoleDTO } from "@validations";
import { RoleService } from "@services";
import { JwtAuthGuard } from "../services/guards/jwt-auth.guard";

@Controller("/role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post("")
  @UseGuards(JwtAuthGuard)
  async addRole(@Body() role: AddRoleDTO): Promise<any> {
    return this.roleService.addRole(role);
  }

  @Get("")
  async getRoles(): Promise<any> {
    return this.roleService.getRoles();
  }
}
