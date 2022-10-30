import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RecipientTest, RecipientTestSchema } from "@entities";
import { RecipientController } from "@controllers";
import { RecipientService } from "@services";
import { QuizModule } from "./quiz.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RecipientTest.name, schema: RecipientTestSchema }
    ]),
    QuizModule
  ],
  exports: [],
  controllers: [RecipientController],
  providers: [RecipientService]
})
export class RecipientTestModule {}
