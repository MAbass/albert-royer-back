import { forwardRef, Module } from "@nestjs/common";
import { SubtestController } from "@controllers";
import { SubtestService } from "@services";
import { MongooseModule } from "@nestjs/mongoose";
import { SubTest, SubTestSchema } from "@entities";
import { QuizModule } from "./quiz.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SubTest.name, schema: SubTestSchema }]),
    forwardRef(() => QuizModule)
  ],
  controllers: [SubtestController],
  providers: [SubtestService],
  exports: [MongooseModule, SubtestService]
})
export class SubtestModule {}
