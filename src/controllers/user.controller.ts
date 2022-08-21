import { Body, Controller, Get, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { AddUserDTO } from '@validations'
import { UserService } from '@services'
import { User } from '@entities'

@Controller()
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('/user')
	async addUser(@Body() user: AddUserDTO, @Res() res: Response): Promise<any> {
		const userSaved: User = await this.userService.addUser(user)
		return res.send(userSaved)
	}
}
