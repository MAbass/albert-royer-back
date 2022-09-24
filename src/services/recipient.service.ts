import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Recipient, RecipientDocument, User, UserDocument } from "@entities";
import { Model } from "mongoose";
import { AddRecipientDTO } from "@validations";

@Injectable()
export class RecipientService {
  private readonly logger: Logger = new Logger(RecipientService.name);

  constructor(
    @InjectModel(Recipient.name)
    private recipientModel: Model<RecipientDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async addRecipient(recipient: AddRecipientDTO) {
    const recipientToSave = new Recipient();
    recipientToSave.firstname = recipient.firstname;
    recipientToSave.lastname = recipient.lastname;

    const userRetrieve = await this.userModel.findById(recipient.user);
    if (!userRetrieve) {
      throw new NotFoundException(
        `The user with id: ${recipient.user} is not found`
      );
    }
    recipientToSave.user = userRetrieve;
    const createdRecipient = new this.recipientModel(recipientToSave);

    return createdRecipient.save();
  }
}
