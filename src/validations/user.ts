import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MinLength
} from "class-validator";

export class AddUserDTO {
  @MinLength(3, {
    message: "The number of characters for the name is greater than 3"
  })
  @IsString({ message: "The name is a string" })
  @IsNotEmpty({ message: "The name is required" })
  public name: string;

  @IsNumberString()
  @IsNotEmpty({ message: "The phone number is required" })
  public phone: string;

  @IsEmail()
  @IsNotEmpty({ message: "The email is required" })
  public email: string;

  @IsMongoId({ message: "The Id of subtest must be a MongoId" })
  @IsNotEmpty({ message: "The subtest Id is required" })
  public subTestId: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty({ message: "The password is required" })
  public password: string;

  @IsString()
  @IsNotEmpty({ message: "The role name is required" })
  public role: string;
}

export class UserLogin {
  @IsString({
    message: "The username must be a characters"
  })
  @IsNotEmpty({ message: "The username is required" })
  public username: string;

  @IsString({ message: "The password must be a characters" })
  @IsNotEmpty({ message: "The password is required" })
  public password: string;
}

export class SearchParamsUserDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumberString()
  phone: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  role: string;
}

export class UpdateUserDTO {
  @MinLength(3, {
    message: "The number of characters for the name is greater than 3"
  })
  @IsString({ message: "The name is a string" })
  @IsOptional()
  public name: string;

  @IsNumberString(null)
  @IsOptional()
  public phone: string;

  @IsEmail()
  @IsOptional()
  public email: string;

  @IsString()
  @IsOptional()
  public role: string;
}

export class ResetPasswordDTO {
  @IsEmail()
  @IsOptional()
  public email: string;
}

export class SendEmailDTO {
  @IsEmail()
  @IsOptional()
  public email: string;

  @IsEmail()
  @IsOptional()
  public token: string;
}

export class ValidateUserDTO {
  @IsUUID()
  @IsNotEmpty()
  public tokenId: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;
}
