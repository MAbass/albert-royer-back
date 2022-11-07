import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import {
  AddComment,
  AddRecipientTest,
  PaginationParams,
  SearchParams
} from "@validations";
import { RecipientService } from "@services";

@Controller("/recipient/test")
export class RecipientController {
  constructor(private readonly recipientService: RecipientService) {}

  @Post("")
  async addRecipientTest(@Body() recipientTest: AddRecipientTest) {
    return this.recipientService.addRecipientTest(recipientTest);
  }

  @Get("/calculate")
  async calculateExisting() {
    return this.recipientService.calculateExisting();
  }

  @Get("/:id")
  async findRecipientById(@Param("id") id: String) {
    return this.recipientService.findRecipientById(id);
  }

  @Put("/:id/add-decision")
  async addDecision(@Param("id") id: String, @Body() addComment: AddComment) {
    return this.recipientService.addDecision(id, addComment);
  }

  @Get("")
  async getAllRecipientTest(@Query() { page, size, search }: PaginationParams) {
    const parseSearch: SearchParams = JSON.parse(search);
    return this.recipientService.searchRecipient(parseSearch, page, size);
  }
}
