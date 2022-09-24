import { Module } from "@nestjs/common";
import { SubtestController } from "@controllers";
import { SubtestService } from "@services";
import { MongooseModule } from "@nestjs/mongoose";
import { SubTest, SubTestSchema } from "@entities";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SubTest.name, schema: SubTestSchema }])
  ],
  controllers: [SubtestController],
  providers: [SubtestService],
  exports: []
})
export class SubtestModule {}
