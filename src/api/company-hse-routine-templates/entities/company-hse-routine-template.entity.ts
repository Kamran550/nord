import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CompanyHseRoutineTemplateTranslation } from './company-hse-routine-templates-translations.entity';
import { HseRoutineCategory } from '../../hse-routine-categories/entities/hse-routine-category.entity';
import { CompanyHseRoutineCategory } from '../../company-hse-routine-categories/entities/company-hse-routine-category.entity';
import { HseRoutineTemplate } from '../../hse-routine-templates/entities/hse-routine-template.entity';
import { Company } from '../../companies/entities/company.entity';


@Entity('company_hse_routine_templates')
export class CompanyHseRoutineTemplate {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

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

  @ApiProperty()
  @Column()
  companyUuid: string;

  @ManyToOne(() => Company, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_uuid' })
  company: Company;

  @ApiProperty()
  @Column({ type: 'uuid', nullable: true })
  hseRoutineTemplateUuid: string;

  @ApiProperty()
  @ManyToOne(() => HseRoutineTemplate)
  @JoinColumn({ name: 'hse_routine_template_uuid' })
  hseRoutineTemplate: HseRoutineTemplate;

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
  @Column()
  isVisible: boolean;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CompanyHseRoutineTemplateTranslation, entity => entity.companyHseRoutineTemplate)
  translations: CompanyHseRoutineTemplateTranslation[];
}
