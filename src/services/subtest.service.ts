import { Injectable, Logger } from "@nestjs/common";
import { SubTest, SubTestDocument } from "@entities";
import { SubTestAddDTO } from "@validations";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class SubtestService {
  private readonly logger: Logger = new Logger(SubtestService.name);

  constructor(
    @InjectModel(SubTest.name)
    private subTestDocumentModel: Model<SubTestDocument>
  ) {}

  async addSubtest(subTestDTO: SubTestAddDTO): Promise<SubTest> {
    const subTest: SubTest = new SubTest();
    subTest.name = subTestDTO.name;
    const subTestSaved = new this.subTestDocumentModel(subTest);
    return subTestSaved.save();
  }
}
