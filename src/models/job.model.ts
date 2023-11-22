export class JobModel {
  private readonly id: any;
  private readonly name: string;
  private readonly description: string;
  private readonly subtest: number;

  constructor(data) {
    this.id = data._id;
    this.name = data.name;
    this.description = data.description;
    this.subtest = data.subtest;
  }

  async getResource() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      subtest: this.subtest
    };
  }
}
