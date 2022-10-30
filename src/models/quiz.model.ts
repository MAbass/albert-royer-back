export class QuizModel {
  private readonly id: any;
  private readonly name: string;
  private readonly text: string;
  private readonly numberOfQuestions: number;
  private readonly data: Array<object>;
  private readonly time: number;
  private readonly listOfResponses: Array<object>;

  constructor(data) {
    this.id = data._id;
    this.name = data.name;
    this.text = data.text;
    this.numberOfQuestions = data.numberOfQuestions;
    this.data = data.data;
    this.time = data.time;
    this.listOfResponses = data.listOfResponses;
  }

  async getResource() {
    return {
      id: this.id,
      name: this.name,
      text: this.text,
      numberOfQuestions: this.numberOfQuestions,
      data: this.data,
      time: this.time,
      listOfResponses: this.listOfResponses
    };
  }
}
