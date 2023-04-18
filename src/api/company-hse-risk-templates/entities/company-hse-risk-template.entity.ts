import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { HseRiskCategory } from '../../hse-risk-categories/entities/hse-risk-category.entity';
import { HseRiskTemplate } from '../../hse-risk-templates/entities/hse-risk-template.entity';
import { CompanyHseRiskTemplateTranslation } from './company-hse-risk-templates-translations.entity';
import { Company } from '../../companies/entities/company.entity';


@Entity('company_hse_risk_templates')
export class CompanyHseRiskTemplate {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  hseRiskCategoryUuid: string;

  @ApiProperty()
  @ManyToOne(() => HseRiskCategory)
  @JoinColumn({ name: 'hse_risk_category_uuid' })
  hseRiskCategory: HseRiskCategory;

  @ApiProperty()
  @Column({ type: 'uuid', nullable: true })
  hseRiskTemplateUuid: string;

  @ApiProperty()
  @ManyToOne(() => HseRiskTemplate)
  @JoinColumn({ name: 'hse_risk_template_uuid' })
  hseRiskTemplate: HseRiskTemplate;

  @ApiProperty()
  @Column()
  companyUuid: string;

  @ManyToOne(() => Company, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_uuid' })
  company: Company;

  @ApiProperty()
  @Column()
  isVisible: boolean;

  @ApiProperty()
  @Column({length:1000})
  name: string;

  @ApiProperty()
  @Column({ type: 'json' })
  barriers: object;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CompanyHseRiskTemplateTranslation, entity => entity.companyHseRiskTemplate)
  translations: CompanyHseRiskTemplateTranslation[];
}
