import {
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength
} from "class-validator";

export class AddQuizDTO {
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  public name: string;

  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  public text: string;

  @IsNotEmpty()
  public data;

  @IsNotEmpty()
  @IsString()
  public subTestName;

  @IsNumber()
  @IsNotEmpty()
  public time: number;

  @IsArray()
  @IsOptional()
  public listOfResponses;
}
