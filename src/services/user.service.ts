import { Injectable, Logger } from '@nestjs/common'
import { AddUserDTO } from '@validations'
import { User } from '@entities'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'

@Injectable()
export class UserService {
	private readonly logger: Logger = new Logger(UserService.name)

	constructor(
		@InjectRepository(User)
		private readonly userRepository: MongoRepository<User>
	) {}

	getHello(): string {
		return 'Hello World!'
	}

	async addUser(user: AddUserDTO): Promise<User> {
		const userSaved: User = new User()
		userSaved.firstname = user.firstname
		userSaved.lastname = user.lastname
		userSaved.email = user.email
		return this.userRepository.save(user)
	}
}
