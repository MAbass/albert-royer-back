import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User, UserDocument } from "@entities";
import * as bcrypt from "bcrypt";
import { UserModel } from "@models";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

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
      throw new UnauthorizedException("Verifier vos paramétres de connexion.");
    }
    if (!user.isVerified) {
      throw new UnauthorizedException("Veuillez confirmer votre email.");
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

  async refreshToken(user) {
    const userFound: User = await this.userModel
      .findById(user.userId)
      .populate("subTestId")
      .populate("role");
    const userModel = new UserModel(userFound);
    return this.retrieveToken(userModel.getResource());
  }

  private retrieveToken(user) {
    const payload = { username: user.username, sub: user.userId };
    const { password, ...result } = user;
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
