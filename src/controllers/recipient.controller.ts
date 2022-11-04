import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { AddRecipientTest, PaginationParams, SearchParams } from "@validations";
import { RecipientService } from "@services";

@Controller("/recipient/test")
export class RecipientController {
  constructor(private readonly recipientService: RecipientService) {}

  @Post("")
  async addRecipientTest(@Body() recipientTest: AddRecipientTest) {
    return this.recipientService.addRecipientTest(recipientTest);
  }

  @Get("")
  async getAllRecipientTest(@Query() { page, size, search }: PaginationParams) {
    const parseSearch: SearchParams = JSON.parse(search);
    return this.recipientService.searchRecipient(parseSearch, page, size);
  }
}
