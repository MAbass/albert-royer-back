import { Body, Controller, Post } from "@nestjs/common";
import { RecipientService } from "@services";
import { AddRecipientDTO } from "@validations";

@Controller()
export class RecipientController {
  constructor(private readonly recipientService: RecipientService) {}

  @Post("/recipient")
  async addRecipient(@Body() recipient: AddRecipientDTO): Promise<any> {
    return await this.recipientService.addRecipient(recipient);
  }
}
