import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { AddUserDTO } from '@validations'
import { Role, User } from '@entities'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'
import { RoleService } from './role.service'

@Injectable()
export class UserService {
	private readonly logger: Logger = new Logger(UserService.name)

	constructor(
		@InjectRepository(User)
		private readonly userRepository: MongoRepository<User>,
		@Inject(RoleService)
		private readonly roleService: RoleService
	) {}

	async addUser(user: AddUserDTO): Promise<User> {
		const userSaved: User = new User()
		userSaved.username = user.username
		userSaved.password = user.password
		userSaved.phone = user.phone

		const role: Role = await this.roleService.getRoleByName(user.role)

		if (!role) {
			throw new NotFoundException(`The role of name ${user.role} is not found`)
		}
		userSaved.role = role.name
		return this.userRepository.save(userSaved)
	}
}
