import {
	IsNotEmpty,
	IsOptional,
	IsPhoneNumber,
	IsString,
	MinLength
} from 'class-validator'

export class AddUserDTO {
	@MinLength(3)
	@IsString()
	@IsNotEmpty()
	public username: string

	@IsString()
	@MinLength(3)
	@IsNotEmpty()
	public password: string

	@IsString()
	@IsNotEmpty()
	public role: string

	@IsString()
	@IsPhoneNumber()
	@IsNotEmpty()
	public phone: string
}

export class UpdateUserDTO {}
