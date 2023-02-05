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
import { JobService } from "@services";
import {
  AddJobDTO,
  PaginationParams,
  SearchParamsJobDTO,
  UpdateJobDTO
} from "@validations";
import { JwtAuthGuard } from "../services/guards/jwt-auth.guard";
import { Job } from "@entities";
import { JobModel } from "../models/job.model";

@Controller("job/")
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post("")
  @UseGuards(JwtAuthGuard)
  async addJob(@Body() addJobDTO: AddJobDTO): Promise<any> {
    const job: Job = await this.jobService.addJob(addJobDTO);
    const jobModel = new JobModel(job);
    return jobModel.getResource();
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  async updateJob(
    @Body() updateJobDTO: UpdateJobDTO,
    @Param("id") id: string
  ): Promise<any> {
    const job: Job = await this.jobService.updateJob(id, updateJobDTO);
    const jobModel = new JobModel(job);
    return jobModel.getResource();
  }

  @Get("")
  async findAll(
    @Query() { page, size, search }: PaginationParams
  ): Promise<any> {
    const parseSearch: SearchParamsJobDTO = JSON.parse(search);
    return this.jobService.findAll(parseSearch, page, size);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async findById(@Param("id") id: string): Promise<any> {
    return this.jobService.findById(id);
  }
  @Get(":id/test")
  async findByTest(@Param("id") id: string): Promise<any> {
    return this.jobService.findByTest(id);
  }
}
