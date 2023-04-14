import {
  Column,
  Entity, JoinColumn,
  ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CompanyHseRiskTemplate } from './company-hse-risk-template.entity';


@Entity('company_hse_risk_templates_translations')
export class CompanyHseRiskTemplateTranslation {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @ApiProperty()
  @Column({ type: 'json' })
  barriers: object;

  @Column()
  locale: string;

  @ManyToOne(() => CompanyHseRiskTemplate, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_hse_risk_template_uuid' })
  companyHseRiskTemplate: CompanyHseRiskTemplate;
}
