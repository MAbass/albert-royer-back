import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Job, JobDocument, SubTest } from "@entities";
import { Model } from "mongoose";
import { AddJobDTO, SearchParamsJobDTO, UpdateJobDTO } from "@validations";
import { SubtestService } from "./subtest.service";
import { paginationResponse } from "@common";
import { JobModel } from "../models/job.model";

@Injectable()
export class JobService {
  private readonly logger: Logger = new Logger(JobService.name);

  constructor(
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
    private readonly subtestService: SubtestService
  ) {}

  async addJob(addJobDTO: AddJobDTO) {
    const subTest: SubTest = await this.subtestService.getById(
      addJobDTO.subtest
    );
    const job: Job = new Job();
    job.name = addJobDTO.name;
    job.description = addJobDTO.description;
    job.subtest = subTest;
    return new this.jobModel(job).save();
  }

  async updateJob(id: string, updateJobDTO: UpdateJobDTO) {
    const job: Job = await this.jobModel.findById(id);
    if (!job) {
      throw new NotFoundException("The job not exist.");
    }

    if (updateJobDTO.name) {
      job.name = updateJobDTO.name;
    }
    if (updateJobDTO.description) {
      job.description = updateJobDTO.description;
    }
    if (updateJobDTO.subtest) {
      const subTest: SubTest = await this.subtestService.getById(
        updateJobDTO.subtest
      );
      job.subtest = subTest;
    }
    return new this.jobModel(job).save();
  }

  async findAll(search: SearchParamsJobDTO, page: number, size: number) {
    const queryJob = {};

    if (search.name && search.name.length) {
      queryJob["$text"] = { $search: search.name };
    }
    if (search.subtest && search.subtest.length) {
      queryJob["subtest"] = { $eq: search.subtest };
    }

    const totalItems = await this.jobModel.find(queryJob).countDocuments();
    const searchResult = await this.jobModel
      .find(queryJob)
      .sort({ createdAt: -1 })
      .skip((page - 1) * size)
      .limit(size);

    const result = await Promise.all(
      searchResult.map(async data => {
        const model = new JobModel(data);
        return model.getResource();
      })
    );
    return paginationResponse(page, size, result, totalItems);
  }

  async findById(id) {
    const job: Job = await this.jobModel.findById(id);
    if (!job) {
      throw new NotFoundException("The job not exist.");
    }
    const jobModel: JobModel = new JobModel(job);

    return jobModel.getResource();
  }

  async findByTest(id: string) {
    const jobs: Array<Job> = await this.jobModel.find({ subtest: id });
    const result = await Promise.all(
      jobs.map(async data => {
        const model = new JobModel(data);
        return model.getResource();
      })
    );
    return result;
  }
}
