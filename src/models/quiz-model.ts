export class QuizModel {
  private id: any;
  private name: string;
  private numberOfQuestions: number;
  private data: Array<object>;
  private time: number;
  private listOfResponses: Array<object>;

  constructor(data) {
    this.id = data._id;
    this.name = data.name;
    this.numberOfQuestions = data.numberOfQuestions;
    this.data = data.data;
    this.time = data.time;
    this.listOfResponses = data.listOfResponses;
  }

  getResource() {
    return {
      id: this.id,
      name: this.name,
      numberOfQuestions: this.numberOfQuestions,
      data: this.data,
      time: this.time,
      listOfResponses: this.listOfResponses
    };
  }
}
