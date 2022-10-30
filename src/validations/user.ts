import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength
} from "class-validator";

export class AddUserDTO {
  @MinLength(3, { message: "Le nom doit être supérieur à 3 charactères" })
  @IsString({ message: "Le nom doit être une chaîne de caractères" })
  @IsNotEmpty({ message: "Le nom ne doit pas être vide" })
  public name: string;

  @IsPhoneNumber(null, { message: "Le numéro de téléphone n'est pas valide" })
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
