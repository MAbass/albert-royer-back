import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from "@nestjs/common";
import {
  AddComment,
  AddRecipientTest,
  PaginationParams,
  SearchParams
} from "@validations";
import { RecipientService } from "@services";
import { JwtAuthGuard } from "../services/guards/jwt-auth.guard";

@Controller("/recipient/test")
export class RecipientController {
  constructor(private readonly recipientService: RecipientService) {}

  @Post("")
  @UseGuards(JwtAuthGuard)
  async addRecipientTest(@Body() recipientTest: AddRecipientTest) {
    return this.recipientService.addRecipientTest(recipientTest);
  }

  @Get("/calculate")
  @UseGuards(JwtAuthGuard)
  async calculateExisting() {
    return this.recipientService.calculateExisting();
  }

  @Get("/:id")
  @UseGuards(JwtAuthGuard)
  async findRecipientById(@Param("id") id: String) {
    return this.recipientService.findRecipientById(id);
  }

  @Put("/:id/add-decision")
  @UseGuards(JwtAuthGuard)
  async addDecision(@Param("id") id: String, @Body() addComment: AddComment) {
    return this.recipientService.addDecision(id, addComment);
  }

  @Get("")
  @UseGuards(JwtAuthGuard)
  async getAllRecipientTest(@Query() { page, size, search }: PaginationParams) {
    const parseSearch: SearchParams = JSON.parse(search);
    return this.recipientService.searchRecipient(parseSearch, page, size);
  }
}
