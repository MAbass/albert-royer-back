import { IsMongoId, IsNotEmpty, IsObject, IsOptional } from "class-validator";

class TestResponse {
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

export class AddRecipientTest {
  @IsNotEmpty()
  public data: TestResponse;

  @IsMongoId()
  @IsNotEmpty()
  public recipient: string;

  @IsMongoId()
  @IsNotEmpty()
  public subtest: string;
}
