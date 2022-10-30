import { Body, Controller, Post } from "@nestjs/common";
import { AddRecipientTest } from "@validations";
import { RecipientService } from "@services";

@Controller("/recipient/test")
export class RecipientController {
  constructor(private readonly recipientService: RecipientService) {}

  @Post("")
  async addRecipientTest(
    @Body() recipientTest: AddRecipientTest
  ): Promise<any> {
    return this.recipientService.addRecipientTest(recipientTest);
  }
}
