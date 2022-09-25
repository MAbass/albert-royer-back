import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { SubTestAddDTO } from "@validations";
import { SubtestService } from "@services";

@Controller("/subtest")
export class SubtestController {
  constructor(private readonly subtestService: SubtestService) {}

  @Post("")
  async postSubtest(@Body() subTest: SubTestAddDTO): Promise<any> {
    return await this.subtestService.addSubtest(subTest);
  }

  @Get("")
  async getSubTest(): Promise<any> {
    return await this.subtestService.getAll();
  }

  @Get(":name")
  async getSubTestByName(@Param("name") name: string): Promise<any> {
    return await this.subtestService.getByName(name);
  }
}
