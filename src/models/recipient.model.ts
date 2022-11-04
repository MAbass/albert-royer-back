export class RecipientModel {
  private readonly id: any;
  private readonly decision: string;
  private readonly decisionComment: string;
  private readonly user: number;
  private readonly subtest: number;
  private readonly result: object;

  constructor(data) {
    this.id = data._id;
    this.decision = data.decision;
    this.decisionComment = data.decisionComment;
    this.user = data.user;
    this.result = data.result;
    this.subtest = data.subtest;
  }

  async getResource() {
    return {
      id: this.id,
      decision: this.decision,
      decisionComment: this.decisionComment,
      user: this.user,
      subtest: this.subtest,
      result: this.result
    };
  }
}
