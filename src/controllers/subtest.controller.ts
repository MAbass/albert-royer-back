import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { SubTestAddDTO, TestResponse } from "@validations";
import { SubtestService } from "@services";

@Controller("/subtest")
export class SubtestController {
  constructor(private readonly subtestService: SubtestService) {}

  @Post("")
  async postSubtest(@Body() subTest: SubTestAddDTO): Promise<any> {
    return this.subtestService.addSubtest(subTest);
  }

  @Post("/submit")
  async postResponse(@Body() testResponse: TestResponse): Promise<any> {
    return this.subtestService.submitResponse(testResponse);
  }

  @Get("")
  async getSubTest(): Promise<any> {
    return this.subtestService.getAll();
  }

  @Get(":name")
  async getSubTestByName(@Param("name") name: string): Promise<any> {
    return this.subtestService.getByName(name);
  }

  @Get(":id/by-id")
  async getSubTestById(@Param("id") name: string): Promise<any> {
    return this.subtestService.getById(name);
  }

  @Get("/pdf/download")
  async downloadTestPdf(): Promise<any> {
    return this.subtestService.downloadPdf();
  }
}
