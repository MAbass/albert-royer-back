import { forwardRef, Module } from "@nestjs/common";
import { JobService } from "@services";
import { MongooseModule } from "@nestjs/mongoose";
import { SubtestModule } from "./subtest.module";
import { Job, JobSchema } from "@entities";
import { JobController } from "@controllers";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
    forwardRef(() => SubtestModule)
  ],
  exports: [JobService, MongooseModule],
  providers: [JobService],
  controllers: [JobController]
})
export class JobModule {}
