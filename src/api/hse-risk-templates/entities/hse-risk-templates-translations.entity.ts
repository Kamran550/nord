import {
  Column,
  Entity, JoinColumn,
  ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { HseRiskTemplate } from './hse-risk-template.entity';
import { ApiProperty } from '@nestjs/swagger';


@Entity('hse_risk_templates_translations')
export class HseRiskTemplateTranslation {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @ApiProperty()
  @Column({ type: 'json' })
  barriers: object;

  @Column()
  locale: string;

  @ManyToOne(() => HseRiskTemplate, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hse_risk_template_uuid' })
  hseRiskTemplate: HseRiskTemplate;
}
