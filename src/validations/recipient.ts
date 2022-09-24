import { IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class AddRecipientDTO {
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  public firstname: string;

  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  public lastname: string;

  @Length(24)
  @IsString()
  @IsNotEmpty()
  public user: string;
}
