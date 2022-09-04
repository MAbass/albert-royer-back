import { IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator'

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

export class AddUserAndRecipientDTO {
	@MinLength(3)
	@IsString()
	@IsNotEmpty()
	public username: string

	@IsString()
	@MinLength(3)
	@IsNotEmpty()
	public password: string

	@IsString()
	@MinLength(3)
	@IsNotEmpty()
	public firstname: string

	@IsString()
	@MinLength(3)
	@IsNotEmpty()
	public lastname: string

	@IsString()
	@IsNotEmpty()
	public role: string

	@IsString()
	@IsPhoneNumber()
	@IsNotEmpty()
	public phone: string
}
