import { ConflictException, Injectable, Logger } from '@nestjs/common'
import { Role } from '@entities'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'
import { AddRoleDTO } from '@validations'

@Injectable()
export class RoleService {
	private readonly logger: Logger = new Logger(RoleService.name)

	constructor(
		@InjectRepository(Role)
		private readonly roleRepository: MongoRepository<Role>
	) {}

	async addRole(role: AddRoleDTO): Promise<Role> {
		const roleSearch: Role = await this.roleRepository.findOne({
			name: role.name
		})

		if (roleSearch) {
			throw new ConflictException(`The role ${roleSearch.name} already exist.`)
		}
		const roleToSave: Role = new Role()
		roleToSave.name = role.name

		return this.roleRepository.save(roleToSave)
	}

	async getRoleByName(name: string) {
		return this.roleRepository.findOne({ name })
	}
}
