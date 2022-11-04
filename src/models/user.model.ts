export class UserModel {
  private readonly id: string;
  private readonly name: string;
  private readonly phone: string;
  private readonly email: string;
  private readonly subTestId: string;
  private readonly password: string;
  private readonly role: string;

  constructor(data) {
    this.id = data._id;
    this.name = data.name;
    this.phone = data.phone;
    this.email = data.email;
    this.subTestId = data.subTestId;
    this.password = data.password;
    this.role = data.role;
  }

  getResource() {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      test: this.subTestId,
      email: this.email,
      password: this.password,
      role: this.role
    };
  }
}
