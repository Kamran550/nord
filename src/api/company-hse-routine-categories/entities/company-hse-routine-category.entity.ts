import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CompanyHseRoutineCategoryTranslation } from './company-hse-routine-categories-translations.entity';
import { Company } from '../../companies/entities/company.entity';


@Entity('company_hse_routine_categories')
export class CompanyHseRoutineCategory {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  companyUuid: string;

  @ManyToOne(() => Company, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_uuid' })
  company: Company;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CompanyHseRoutineCategoryTranslation, entity => entity.companyHseRoutineCategory)
  translations: CompanyHseRoutineCategoryTranslation[];
}
