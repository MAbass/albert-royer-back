import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MinLength
} from "class-validator";

export class SubTestAddDTO {
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  public name: string;
}

export class TestResponse {
  @IsObject()
  public firstQuiz: string;
  @IsObject()
  public secondQuiz: string;
  @IsOptional()
  @IsObject()
  public thirdQuiz: string;
  @IsOptional()
  @IsObject()
  public fourthQuiz: string;
}
