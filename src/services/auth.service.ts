import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { User, UserDocument } from "@entities";
import * as bcrypt from "bcrypt";
import { UserModel } from "@models";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { RefreshTokenDTO, ResponseRefreshToken } from "../validations/auth";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async validateUser(username: string, password: string) {
    const user: User = await this.userModel
      .findOne({ $or: [{ phone: username }, { email: username }] })
      .populate("subTestId")
      .populate("role");
    if (!user) {
      throw new UnauthorizedException("Check your login settings.");
    }
    if (!user.isVerified) {
      throw new UnauthorizedException("Please confirm your email.");
    }

    const passwordCrypt = await bcrypt.compare(password, user && user.password);
    if (user && passwordCrypt) {
      const userModel = new UserModel(user);
      return userModel.getResource();
    }
    return null;
  }

  async login(user: any) {
    return this.retrieveToken(user);
  }

  async refreshToken(tokenDTO: RefreshTokenDTO) {
    try {
      const resultVerified: ResponseRefreshToken = this.jwtService.verify(
        tokenDTO.refresh_token,
        {
          secret: this.configService.get("TOKEN_SECRET")
        }
      );
      const userFound = await this.userModel
        .findById(resultVerified.id)
        .populate("role")
        .populate("subTestId");
      const user = new UserModel(userFound);
      return this.retrieveToken(user.getResource());
    } catch (error) {
      throw new BadRequestException("Your token is expired.");
    }
  }

  private retrieveToken(user) {
    const payload = { id: user.id };
    // console.log(user)
    const { password, ...result } = user;
    // console.log(result)
    return {
      access_token: this.jwtService.sign(result, {
        secret: this.configService.get("TOKEN_SECRET"),
        expiresIn: this.configService.get("ACCESS_TOKEN_EXPIRE")
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: this.configService.get("TOKEN_SECRET"),
        expiresIn: this.configService.get("REFRESH_TOKEN_EXPIRE")
      })
    };
  }
}
