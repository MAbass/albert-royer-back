import { Inject, Injectable, Logger } from "@nestjs/common";
import { RecipientTest, RecipientTestDocument } from "@entities";
import { AddRecipientTest } from "@validations";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { QuizService } from "./quiz.service";

@Injectable()
export class RecipientService {
  private readonly logger: Logger = new Logger(RecipientService.name);

  constructor(
    @InjectModel(RecipientTest.name)
    private roleModel: Model<RecipientTestDocument>,
    @Inject(QuizService) private quizService: QuizService
  ) {}

  async addRecipientTest(recipient: AddRecipientTest): Promise<RecipientTest> {
    let resultFirstQuiz: number = 0;
    let resultSecondQuiz: number = 0;
    const firstQuiz = recipient.data.firstQuiz;
    firstQuiz["data"].map(response => {
      const givingResponse = response["question"].filter(
        response => response.isActive === true
      )[0];
      if (givingResponse) {
        resultFirstQuiz =
          resultFirstQuiz + (givingResponse["sup"] - givingResponse["inf"]);
      }
    });
    const secondQuiz = recipient.data.secondQuiz;
    const retrieveSecondQuiz = await this.quizService.getQuiz(secondQuiz["id"]);
    secondQuiz["data"].map(response => {
      const nameQuestion = response["name"];
      const givingResponse = response["question"].filter(
        response => response.value === true
      )[0];
      const rightResponse = retrieveSecondQuiz.listOfResponses.filter(
        response => response[nameQuestion]
      )[0];
      if (
        givingResponse &&
        givingResponse["title"] === rightResponse[nameQuestion]
      ) {
        resultSecondQuiz = resultSecondQuiz + 1;
      }
    });
    const thirdQuiz = recipient.data.thirdQuiz;
    const thirdQuizChoice = thirdQuiz["data"]["images"].filter(
      quiz => quiz["choice"]
    )[0]["choice"];
    const retrieveThirdQuiz = await this.quizService.getQuiz(thirdQuiz["id"]);
    // thirdQuiz['data'][thirdQuizChoice].map(response => {
    // 	console.log(response)
    //
    // })
    console.log(thirdQuiz["data"]);
    console.log(thirdQuiz);
    return null;
  }
}
