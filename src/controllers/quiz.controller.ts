import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { QuizService } from "@services";
import { AddQuizDTO } from "@validations";

@Controller("quiz/")
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post("")
  async addQuiz(@Body() quizDTO: AddQuizDTO): Promise<any> {
    return this.quizService.addQuiz(quizDTO);
  }

  @Get(":name")
  async getByName(@Param("name") name: string): Promise<any> {
    return this.quizService.getByName(name);
  }
}
