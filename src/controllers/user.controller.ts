import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { AddUserAndRecipientDTO, AddUserDTO } from '@validations'
import { UserService } from '@services'
import { Recipient, User } from '@entities'

@Controller()
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('/user')
	async addUser(@Body() user: AddUserDTO): Promise<any> {
		const userSaved: User = await this.userService.addUser(user)
		return userSaved
	}

	@Post('/user-recipient')
	async addUserAndRecipient(
		@Body() userRecipient: AddUserAndRecipientDTO
	): Promise<any> {
		const recipientSaved: Recipient = await this.userService.addUserAndRecipient(
			userRecipient
		)
		return recipientSaved
	}
}
