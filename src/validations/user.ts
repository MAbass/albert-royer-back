import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MinLength
} from 'class-validator'

export class AddUserDTO {
	@MinLength(3)
	@IsString()
	@IsNotEmpty()
	public firstname: string

	@IsString()
	@MinLength(3)
	@IsNotEmpty()
	public lastname: string

	@IsString()
	@IsEmail()
	@IsNotEmpty()
	public email: string
}

export class UpdateUserDTO {
	@MinLength(3)
	@IsString()
	@IsNotEmpty()
	public firstname: string

	@IsString()
	@MinLength(3)
	@IsNotEmpty()
	public lastname: string

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	public email: string
}
