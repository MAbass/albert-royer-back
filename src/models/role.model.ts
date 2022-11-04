export class RoleModel {
  private readonly id: any;
  private readonly name: string;

  constructor(data) {
    this.id = data._id;
    this.name = data.name;
  }

  async getResource() {
    return {
      id: this.id,
      name: this.name
    };
  }
}
