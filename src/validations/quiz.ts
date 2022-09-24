import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

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

  public image: string;

  @IsNumber()
  @IsNotEmpty()
  public time: number;

  listOfResponses: [];
}
