import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength
} from "class-validator";

export class AddJobDTO {
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  public name: string;

  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  @IsMongoId()
  public subtest;
}

export class UpdateJobDTO {
  @MinLength(3)
  @IsString()
  @IsOptional()
  public name: string;

  @MinLength(3)
  @IsString()
  @IsOptional()
  public description: string;

  @IsNotEmpty()
  @IsOptional()
  public subtest;
}

export class SearchParamsJobDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  subtest: string;
}
