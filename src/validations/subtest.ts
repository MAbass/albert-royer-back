import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class SubTestAddDTO {
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  public name: string;
}
