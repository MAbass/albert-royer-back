import { Module } from "@nestjs/common";
import { QuizController } from "@controllers";
import { QuizService } from "@services";
import { MongooseModule } from "@nestjs/mongoose";
import { Quiz, QuizSchema } from "../entities/quiz.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }])
  ],
  exports: [],
  providers: [QuizService],
  controllers: [QuizController]
})
export class QuizModule {}
