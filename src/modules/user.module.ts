import { forwardRef, Module } from "@nestjs/common";
import { RecipientService, UserService } from "@services";
import { UserController } from "@controllers";
import { User, UserSchema } from "@entities";
import { MongooseModule } from "@nestjs/mongoose";
import { RecipientTestModule, RoleModule, SubtestModule } from "@modules";
import { ConfigModule } from "@nestjs/config";
import { MailerModule } from "@nestjs-modules/mailer";
import { JobModule } from "./job.module";

@Module({
  imports: [
    ConfigModule,
    MailerModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => RoleModule),
    forwardRef(() => SubtestModule),
    forwardRef(() => RecipientTestModule),
    forwardRef(() => JobModule)
  ],
  providers: [UserService],
  exports: [UserService, MongooseModule],
  controllers: [UserController]
})
export class UserModule {}
