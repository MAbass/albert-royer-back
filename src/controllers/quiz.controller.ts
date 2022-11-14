import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { QuizService } from "@services";
import { AddQuizDTO } from "@validations";
import { JwtAuthGuard } from "@services";

@Controller("quiz/")
@UseGuards(JwtAuthGuard)
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
