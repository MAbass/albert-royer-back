import { Module } from "@nestjs/common";
import { UserModule } from "@modules";
import { AuthService, JwtStrategy, LocalStrategy } from "@services";
import { AuthController } from "@controllers";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [UserModule, PassportModule, ConfigModule, JwtModule],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: []
})
export class AuthModule {}
