import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { SubTestAddDTO, TestResponse } from "@validations";
import { SubtestService } from "@services";
import { JwtAuthGuard } from "../services/guards/jwt-auth.guard";
import { SubtestModel } from "@models";
import { SubTest } from "@entities";

@Controller("/subtest")
export class SubtestController {
  constructor(private readonly subtestService: SubtestService) {}

  @Post("")
  @UseGuards(JwtAuthGuard)
  async postSubtest(@Body() subTest: SubTestAddDTO): Promise<any> {
    return this.subtestService.addSubtest(subTest);
  }

  @Post("/submit")
  @UseGuards(JwtAuthGuard)
  async postResponse(@Body() testResponse: TestResponse): Promise<any> {
    return this.subtestService.submitResponse(testResponse);
  }

  @Get("")
  async getSubTest(): Promise<any> {
    return this.subtestService.getAll();
  }

  @Get(":name")
  @UseGuards(JwtAuthGuard)
  async getSubTestByName(@Param("name") name: string): Promise<any> {
    return this.subtestService.getByName(name);
  }

  @Get(":id/by-id")
  @UseGuards(JwtAuthGuard)
  async getSubTestById(@Param("id") name: string): Promise<any> {
    const subTest: SubTest = await this.subtestService.getById(name);
    const subTestModel: SubtestModel = new SubtestModel(subTest);
    return subTestModel.getResource();
  }

  @Get("/pdf/download/:search")
  @UseGuards(JwtAuthGuard)
  async downloadTestPdf(@Param("search") search: string): Promise<any> {
    return this.subtestService.downloadPdf(search);
  }
}
