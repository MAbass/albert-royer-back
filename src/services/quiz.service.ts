import { InjectModel } from "@nestjs/mongoose";
import { Quiz, QuizDocument } from "../entities/quiz.entity";
import { Model } from "mongoose";
import { AddQuizDTO } from "@validations";

export class QuizService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<QuizDocument>) {}

  async addQuiz(quizDTO: AddQuizDTO) {
    const quiz = new Quiz();

    quiz.name = quizDTO.name;
    quiz.data = quizDTO.data;
    quiz.time = quizDTO.time;
    quiz.text = quizDTO.text;
    /*
				for (const val of quiz.data) {
					if (val.image) {
						// val.image = await base64_encode()
						val.image = await base64_encode()
					}
				}
		*/
    quiz.numberOfQuestions = quizDTO.data.length;
    quiz.listOfResponses = quizDTO.listOfResponses;

    const quizSaved = new this.quizModel(quiz);

    return quizSaved.save();
  }
}
