import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenDTO {
  @IsString()
  @IsNotEmpty()
  public refresh_token: string;
}

export class ResponseRefreshToken {
  public id: string;
  public iat: string;
  public exp: string;
}
