import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { HseRoutineCategory } from '../../hse-routine-categories/entities/hse-routine-category.entity';
import { CompanyHseRoutineCategory } from '../../company-hse-routine-categories/entities/company-hse-routine-category.entity';
import { Company } from '../../companies/entities/company.entity';
import { HseRoutineTemplate } from '../../hse-routine-templates/entities/hse-routine-template.entity';
import { User } from '../../users/entities/user.entity';
import { CompanyHseRoutineTemplate } from '../../company-hse-routine-templates/entities/company-hse-routine-template.entity';
import { Project } from '../../projects/entities/project.entity';
import { AssignedHseRoutineTranslation } from './assigned-hse-routines-translations.entity';


@Entity('assigned_hse_routines')
export class AssignedHseRoutine {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  // Either System HSE Routine category or Company HSE  Routine category
  @ApiProperty()
  @Column({ type: 'uuid', nullable: true })
  hseRoutineCategoryUuid: string;

  @ApiProperty()
  @ManyToOne(() => HseRoutineCategory)
  @JoinColumn({ name: 'hse_routine_category_uuid' })
  hseRoutineCategory: HseRoutineCategory;

  @ApiProperty()
  @Column({ type: 'uuid', nullable: true })
  companyHseRoutineCategoryUuid: string;

  @ApiProperty()
  @ManyToOne(() => CompanyHseRoutineCategory)
  @JoinColumn({ name: 'company_hse_routine_category_uuid' })
  companyHseRoutineCategory: CompanyHseRoutineCategory;

  // Either System HSE Routine template or Company HSE  Routine template
  @ApiProperty()
  @Column({ type: 'uuid', nullable: true })
  hseRoutineTemplateUuid: string;

  @ApiProperty()
  @ManyToOne(() => HseRoutineTemplate)
  @JoinColumn({ name: 'hse_routine_template_uuid' })
  hseRoutineTemplate: HseRoutineTemplate;

  @ApiProperty()
  @Column({ type: 'uuid', nullable: true })
  companyHseRoutineTemplateUuid: string;

  @ApiProperty()
  @ManyToOne(() => CompanyHseRoutineTemplate)
  @JoinColumn({ name: 'company_hse_routine_template_uuid' })
  companyHseRoutineTemplate: CompanyHseRoutineTemplate;

  @ApiProperty()
  @Column({ type: 'uuid' })
  companyUuid: string;

  @ApiProperty()
  @ManyToOne(() => Company, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_uuid' })
  company: Company;

  @ApiProperty()
  @Column({ type: 'uuid', nullable: true })
  projectUuid: string;

  @ApiProperty()
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
  @Column({ type: 'uuid' })
  revisedByPersonUuid: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'revised_by_person_uuid' })
  revisedByPerson: User;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({
    type: 'blob',
    transformer: {
      to: (value: string) => Buffer.from(value),
      from: (value: Buffer) => value.toString()
    }
  })
  content: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @VersionColumn()
  version:number;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => AssignedHseRoutineTranslation, entity => entity.assignedHseRoutine)
  translations: AssignedHseRoutineTranslation[];
}
