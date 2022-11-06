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
  @MinLength(3, { message: "Le nom doit être supérieur à 3 charactères" })
  @IsString({ message: "Le nom doit être une chaîne de caractères" })
  @IsNotEmpty({ message: "Le nom ne doit pas être vide" })
  public name: string;

  @IsNumberString()
  @IsNotEmpty({ message: "Le numéro de téléphone ne doit pas être vide" })
  public phone: string;

  @IsEmail()
  @IsNotEmpty({ message: "L'email ne doit pas être vide" })
  public email: string;

  @IsMongoId({ message: "L'id du subtest doit être un Id" })
  @IsNotEmpty({ message: "L'Id ne doit pas être vide" })
  public subTestId: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty({ message: "Le mot de passe ne doit pas être vide" })
  public password: string;

  @IsString()
  @IsNotEmpty({ message: "Le role ne doit pas être vide" })
  public role: string;
}

export class UserLogin {
  @IsString({
    message: "Le nom d'utilisateur doit être une chaîne de caractères"
  })
  @IsNotEmpty({ message: "Le nom d'utilisateur ne doit pas être vide" })
  public username: string;

  @IsString({ message: "Le mot de passe doit être une chaîne de caractères" })
  @IsNotEmpty({ message: "Le mot de passe ne doit pas être vide" })
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
  @MinLength(3, { message: "Le nom doit être supérieur à 3 charactères" })
  @IsString({ message: "Le nom doit être une chaîne de caractères" })
  @IsOptional()
  public name: string;

  @IsNumber(null)
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
