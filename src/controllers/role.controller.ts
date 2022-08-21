import { Body, Controller, Post, Res } from '@nestjs/common'
import { Role } from '@entities'
import { Response } from 'express'
import { AddRoleDTO } from '@validations'
import { RoleService } from '@services'

@Controller()
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@Post('/role')
	async addRole(@Body() role: AddRoleDTO, @Res() res: Response): Promise<any> {
		const roleSaved: Role = await this.roleService.addRole(role)
		return res.send(roleSaved)
	}
}
