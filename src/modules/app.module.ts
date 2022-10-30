import { CacheModule, forwardRef, Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { CacheService, MongooseConfigService } from "@config";
import {
  AuthModule,
  QuizModule,
  RecipientTestModule,
  RoleModule,
  SubtestModule,
  UserModule
} from "@modules";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import configEnvironment from "@config-env";

@Module({
  imports: [
    forwardRef(() => RoleModule),
    forwardRef(() => UserModule),
    forwardRef(() => QuizModule),
    forwardRef(() => SubtestModule),
    forwardRef(() => AuthModule),
    forwardRef(() => RecipientTestModule),
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      load: [configEnvironment]
    }),
    CacheModule.registerAsync({
      useClass: CacheService
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService
    }),
    ScheduleModule.forRoot()
  ]
})
export class AppModule {}
