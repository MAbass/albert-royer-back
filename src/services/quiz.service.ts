import { InjectModel } from "@nestjs/mongoose";
import { Quiz, QuizDocument } from "../entities/quiz.entity";
import { Model } from "mongoose";
import { AddQuizDTO } from "@validations";
import { SubTest, SubTestDocument } from "@entities";
import { Logger, NotFoundException } from "@nestjs/common";
import { QuizModel } from "@models";

export class QuizService {
  private readonly logger: Logger = new Logger(QuizService.name);

  constructor(
    @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
    @InjectModel(SubTest.name)
    private readonly subTestModel: Model<SubTestDocument>
  ) {}

  async addQuiz(quizDTO: AddQuizDTO) {
    // Check if subtest name already exist
    const subtest: SubTest = await this.subTestModel.findOne({
      name: quizDTO.subTestName
    });
    if (!subtest) {
      throw new NotFoundException(
        `The subtest name ${quizDTO.subTestName} not exist`
      );
    }
    const quiz = new Quiz();
    quiz.name = quizDTO.name;
    quiz.data = quizDTO.data;
    quiz.time = quizDTO.time;
    quiz.text = quizDTO.text;
    quiz.numberOfQuestions = quizDTO.data.length;
    quiz.listOfResponses = quizDTO.listOfResponses;
    const quizSaved = await new this.quizModel(quiz).save();
    subtest.quiz.push(quizSaved._id);

    await new this.subTestModel(subtest).save();
    return quizSaved;
  }

  async getQuiz(id: string) {
    // this.logger.debug(`Id: ${id}`)
    const quiz: Quiz = await this.quizModel.findById(id);
    const quizModel = new QuizModel(quiz);
    return quizModel.getResource();
  }

  async getQuizzes(ids: Array<string>) {
    const quizzes = [];
    for (const id of ids) {
      quizzes.push(await this.getQuiz(id));
    }
    return quizzes;
  }

  async getByName(name: string) {
    const quiz: Quiz = await this.quizModel.findOne({ name });
    const quizModel = new QuizModel(quiz);
    return quizModel.getResource();
  }
}
