import { Body, Controller, Post } from "@nestjs/common";
import { QuizService } from "@services";
import { AddQuizDTO } from "@validations";

@Controller()
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post("/quiz")
  async addQuiz(@Body() quizDTO: AddQuizDTO): Promise<any> {
    return this.quizService.addQuiz(quizDTO);
  }
}
