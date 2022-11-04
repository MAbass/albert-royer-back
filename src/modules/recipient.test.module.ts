import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RecipientTest, RecipientTestSchema } from "@entities";
import { RecipientController } from "@controllers";
import { RecipientService } from "@services";
import { QuizModule } from "./quiz.module";
import { UserModule } from "./user.module";
import { SubtestModule } from "./subtest.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RecipientTest.name, schema: RecipientTestSchema }
    ]),
    QuizModule,
    UserModule,
    SubtestModule
  ],
  exports: [],
  controllers: [RecipientController],
  providers: [RecipientService]
})
export class RecipientTestModule {}
