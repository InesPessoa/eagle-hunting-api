import { State } from 'src/applications/enums/state.enum/state.enum';
import { Job } from 'src/jobs/entities/job.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinTable()
  @OneToOne(() => Job)
  job: Job;

  @Column({
    type: 'enum',
    enum: State,
    default: State.DRAFT,
  })
  state: State;

  @Column()
  notes: string;

  @Column()
  numberOfInterviews: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
