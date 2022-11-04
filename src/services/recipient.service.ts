import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import {
  CommentResult,
  QuizResult,
  RecipientTest,
  RecipientTestDocument,
  SubTest,
  SubTestDocument,
  User,
  UserDocument
} from "@entities";
import { AddRecipientTest, SearchParams } from "@validations";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { QuizService } from "./quiz.service";
import { getDecisionFirstQuiz, paginationResponse } from "@common";
import { RecipientModel } from "@models";

@Injectable()
export class RecipientService {
  private readonly logger: Logger = new Logger(RecipientService.name);

  constructor(
    @InjectModel(SubTest.name)
    private subTestModel: Model<SubTestDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(RecipientTest.name)
    private recipientModel: Model<RecipientTestDocument>,
    @Inject(QuizService) private quizService: QuizService
  ) {}

  async addRecipientTest(addRecipientDTO: AddRecipientTest) {
    const recipient: RecipientTest = new RecipientTest();

    const subtest = await this.subTestModel.findById(addRecipientDTO.subtest);
    if (!subtest) {
      throw new NotFoundException("Le test n'existe pas");
    }
    const user = await this.userModel.findById(addRecipientDTO.user);
    if (!user) {
      throw new NotFoundException("L'utilisateur n'existe pas");
    }

    recipient.user = user;
    recipient.subtest = subtest;

    let resultFirstQuiz: number = 0;
    let resultSecondQuiz: number = 0;
    let resultThirdQuiz: number = 0;
    let resultFourthQuiz: number = 0;

    // Processing First Quiz
    const firstQuiz = addRecipientDTO.data.firstQuiz;
    firstQuiz["data"].map(response => {
      const givingResponse = response["question"].filter(
        response => response.isActive === true
      )[0];
      if (givingResponse) {
        resultFirstQuiz =
          resultFirstQuiz + (givingResponse["sup"] - givingResponse["inf"]);
      }
    });
    // Processing Second Quiz
    const secondQuiz = addRecipientDTO.data.secondQuiz;
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
        resultSecondQuiz += 1;
      }
    });
    // Processing Third Quiz
    const thirdQuiz = addRecipientDTO.data.thirdQuiz;
    if (thirdQuiz) {
      const thirdQuizChoice = thirdQuiz["data"]["images"].filter(
        quiz => quiz["choice"]
      )[0]["choice"];
      const retrieveThirdQuiz = await this.quizService.getQuiz(thirdQuiz["id"]);
      thirdQuiz["data"][thirdQuizChoice].map(response => {
        // console.log(response)
        const nameQuestion = response["name"];
        const givingResponse = response["question"].filter(
          response => response.value === true
        )[0];
        const rightResponseOfChoice = retrieveThirdQuiz.listOfResponses.filter(
          response => response[thirdQuizChoice]
        )[0][thirdQuizChoice];
        const rightResponse = rightResponseOfChoice.filter(
          response => response[nameQuestion]
        )[0];
        if (
          givingResponse &&
          givingResponse["title"] === rightResponse[nameQuestion]
        ) {
          resultThirdQuiz += 1;
        }
      });
    } // Processing Fourth Quiz
    const fourthQuiz = addRecipientDTO.data.fourthQuiz;
    if (fourthQuiz) {
      const responseFourthQuiz = fourthQuiz["data"][0]["question"].filter(
        response => response["value"] === true
      )[0];
      if (responseFourthQuiz["title"] === "Non") {
        resultFourthQuiz = 1;
      }
    }
    // recipient.result.firstQuiz.score = resultFirstQuiz;
    const quizResult: QuizResult = new QuizResult();

    const commentResultFirst = new CommentResult();

    commentResultFirst.score = resultFirstQuiz;
    commentResultFirst.decision = getDecisionFirstQuiz(resultFirstQuiz);
    quizResult.firstQuiz = commentResultFirst;

    const commentResultSecond = new CommentResult();
    commentResultSecond.score = resultSecondQuiz;
    quizResult.secondQuiz = commentResultSecond;

    if (thirdQuiz) {
      const commentResultThird = new CommentResult();
      commentResultThird.score = resultThirdQuiz;
      quizResult.thirdQuiz = commentResultThird;
    }

    if (thirdQuiz) {
      const commentResultFourth = new CommentResult();
      commentResultFourth.score = resultFourthQuiz;
      quizResult.fourthQuiz = commentResultFourth;
    }

    recipient.result = quizResult;

    const recipientSaved = await new this.recipientModel(recipient).save();
    const recipientModel = new RecipientModel(recipientSaved);

    return recipientModel.getResource();
  }

  async searchRecipient(search: SearchParams, page: number, size: number) {
    let queryGlobal = [];
    const query = {};
    const queryUser = {};

    let users;
    if (search && search.name) {
      queryUser["$text"] = { $search: search.name };
    }
    if (Object.keys(queryUser).length) {
      users = await this.userModel.find(queryUser);
    }
    if (users && users.length) {
      query["user"] = { $in: users.map(r => r._id.toString()) };
    }
    if (search && search.infScore) {
      let querySupScore = [];
      querySupScore.push({
        "result.firstQuiz.score": { $lte: search.infScore }
      });
      querySupScore.push({
        "result.secondQuiz.score": { $lte: search.infScore }
      });
      querySupScore.push({
        "result.thirdQuiz.score": { $lte: search.infScore }
      });
      querySupScore.push({
        "result.fourthQuiz.score": { $lte: search.infScore }
      });
      queryGlobal.push({ $or: querySupScore });
    }
    if (search && search.supScore) {
      let queryInfScore = [];
      queryInfScore.push({
        "result.firstQuiz.score": { $gte: search.supScore }
      });
      queryInfScore.push({
        "result.secondQuiz.score": { $gte: search.supScore }
      });
      queryInfScore.push({
        "result.thirdQuiz.score": { $gte: search.supScore }
      });
      queryInfScore.push({
        "result.fourthQuiz.score": { $gte: search.supScore }
      });
      queryGlobal.push({ $or: queryInfScore });
    }

    if (search && search.decisionOfSuperior) {
      query["decision"] = { $eq: search.decisionApp };
    }
    if (search && search.decisionApp) {
    }

    if (search && search.subtest) {
      query["subtest"] = { $eq: search.subtest };
    }

    queryGlobal.push(query);

    const totalItems = await this.recipientModel
      .find({ $and: queryGlobal })
      .countDocuments();
    const searchResult = await this.recipientModel
      .find({ $and: queryGlobal })
      .sort({ createdAt: -1 })
      .skip((page - 1) * size)
      .limit(size)
      .populate("user")
      .populate("subtest");
    // console.log(searchResult);

    const result = await Promise.all(
      searchResult.map(async data => {
        const model = new RecipientModel(data);
        return model.getResource();
      })
    );
    return paginationResponse(page, size, result, totalItems);
  }
}
