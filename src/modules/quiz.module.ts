import { forwardRef, Module } from "@nestjs/common";
import { QuizController } from "@controllers";
import { QuizService } from "@services";
import { MongooseModule } from "@nestjs/mongoose";
import { Quiz, QuizSchema } from "../entities/quiz.entity";
import { SubtestModule } from "./subtest.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
    forwardRef(() => SubtestModule)
  ],
  exports: [QuizService, MongooseModule],
  providers: [QuizService],
  controllers: [QuizController]
})
export class QuizModule {}
