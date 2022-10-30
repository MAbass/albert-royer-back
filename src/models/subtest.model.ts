export class SubtestModel {
  private readonly id: string;
  private readonly name: string;
  private readonly quiz: Array<object>;

  constructor(data) {
    this.id = data._id;
    this.name = data.name;
    this.quiz = data.quiz;
  }

  getResource() {
    return {
      id: this.id,
      name: this.name,
      quiz: this.quiz
    };
  }
}
