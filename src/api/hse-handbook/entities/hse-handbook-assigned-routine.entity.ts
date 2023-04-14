import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Company } from '../../companies/entities/company.entity';
import { User } from '../../users/entities/user.entity';
import { HseHandbook } from './hse-handbook.entity';
import { Project } from '../../projects/entities/project.entity';
import { AssignedHseRoutine } from '../../assigned-hse-routines/entities/assigned-hse-routine.entity';
import { HseHandbookAssignedRoutineTranslation } from './hse-handbook-assigned-routine-translation.entity';



@Entity('hse_handbook_assigned_routines')
export class HseHandbookAssignedRoutine {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  companyUuid: string;

  @ApiProperty()
  @ManyToOne(() => Company, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_uuid' })
  company: Company;

  @ApiProperty()
  @Column({ nullable: true })
  projectUuid: string;

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_uuid' })
  project: Project;

  @ApiProperty()
  @Column({ type: 'uuid' })
  responsibleUserUuid: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'responsible_user_uuid' })
  responsibleUser: User;

  @ApiProperty()
  @Column()
  lastRevisedByUuid: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'last_revised_by_uuid' })
  lastRevisedBy: User;

  @ApiProperty()
  @Column({ type: 'datetime', precision: 6 })
  lastRevisedAt: Date;

  @ApiProperty()
  @Column()
  version: number;

  // Either System HSE Routine category or Company HSE  Routine category
  @ApiProperty()
  @Column({ nullable: true })
  hseRoutineCategory: string;

  @ApiProperty()
  @Column({ nullable: true })
  companyHseRoutineCategory: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({
    type: 'blob',
    transformer: {
      to: (value: string) => Buffer.from(value),
      from: (value: Buffer) => value?.toString()
    }
  })
  content: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @Column()
  assignedHseRoutineUuid: string;

  @ManyToOne(() => AssignedHseRoutine, { createForeignKeyConstraints: false})
  @JoinColumn({ name: 'assigned_hse_routine_uuid' })
  assignedHseRoutine: AssignedHseRoutine;

  @ApiProperty()
  @Column()
  hseHandbookUuid: string;

  @ManyToOne(() => HseHandbook, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hse_handbook_uuid' })
  hseHandbook: HseHandbook;

  @OneToMany(() => HseHandbookAssignedRoutineTranslation, entity => entity.hseHandbookAssignedRoutine)
  translations: HseHandbookAssignedRoutineTranslation[];
}
