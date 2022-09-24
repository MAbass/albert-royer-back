import { Body, Controller, Post } from "@nestjs/common";
import { SubTestAddDTO } from "@validations";
import { SubtestService } from "@services";

@Controller()
export class SubtestController {
  constructor(private readonly subtestService: SubtestService) {}

  @Post("/role")
  async addRole(@Body() subTest: SubTestAddDTO): Promise<any> {
    return await this.subtestService.addSubtest(subTest);
  }
}
