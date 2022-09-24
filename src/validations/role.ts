import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class AddRoleDTO {
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  public name: string;
}
