import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "@services";
import { LocalAuthGuard } from "../services/guards/local-auth.guard";
import { JwtAuthGuard } from "../services/guards/jwt-auth.guard";
import { RefreshTokenDTO } from "../validations/auth";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Post("/refresh-token")
  async refreshToken(@Body() tokenDTO: RefreshTokenDTO) {
    return this.authService.refreshToken(tokenDTO);
  }
}
