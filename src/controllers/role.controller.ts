import { Body, Controller, Get, Post } from "@nestjs/common";
import { AddRoleDTO } from "@validations";
import { RoleService } from "@services";

@Controller("/role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post("")
  async addRole(@Body() role: AddRoleDTO): Promise<any> {
    return this.roleService.addRole(role);
  }

  @Get("")
  async getRoles(): Promise<any> {
    return this.roleService.getRoles();
  }
}
