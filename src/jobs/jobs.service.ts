import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  findAll() {
    return this.jobRepository.find();
  }

  async findOne(id: string) {
    const job = await this.jobRepository.findOne({ where: { id: +id } });
    if (!job) {
      throw new NotFoundException(`Job #${id} not found`);
    }
    return job;
  }

  create(createJobDto: CreateJobDto) {
    const job = this.jobRepository.create(createJobDto);
    return this.jobRepository.save(job);
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    const job = await this.jobRepository.preload({
      id: +id,
      ...updateJobDto,
    });

    if (!job) {
      throw new NotFoundException(`Job #${id} not found`);
    }
    return this.jobRepository.save(job);
  }

  async remove(id: string) {
    const job = await this.findOne(id);
    return this.jobRepository.remove(job);
  }
}
