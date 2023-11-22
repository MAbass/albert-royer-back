import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString
} from "class-validator";
import { Type } from "class-transformer";

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
  public user: string;

  @IsMongoId()
  @IsNotEmpty()
  public subtest: string;
}

export class SearchParams {
  @IsOptional()
  @IsNumber()
  infScore: number;

  @IsOptional()
  @IsNumber()
  supScore: number;

  @IsString()
  @IsOptional()
  decisionApp: string;

  @IsString()
  @IsOptional()
  decision: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsMongoId()
  subtest: number;

  @IsOptional()
  @IsMongoId()
  job: number;
}

export class AddComment {
  @IsEnum(["waiting", "rejected", "approved"])
  @IsNotEmpty()
  decision: string;

  @IsString()
  @IsNotEmpty()
  decisionComment: string;
}

export class PaginationParams {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  size: number = 10;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @IsString()
  search: string;
}
