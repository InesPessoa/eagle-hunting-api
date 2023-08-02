import { IsString } from 'class-validator';

export class CreateJobDto {
  @IsString()
  readonly description: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly company: string;

  @IsString()
  readonly location: string;

  @IsString()
  readonly postingDate: Date;
}
