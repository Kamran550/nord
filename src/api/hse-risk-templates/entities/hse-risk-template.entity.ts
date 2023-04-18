import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { HseRiskCategory } from '../../hse-risk-categories/entities/hse-risk-category.entity';
import { HseRiskTemplateTranslation } from './hse-risk-templates-translations.entity';


@Entity('hse_risk_templates')
export class HseRiskTemplate {
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

  @OneToMany(() => HseRiskTemplateTranslation, entity => entity.hseRiskTemplate)
  translations: HseRiskTemplateTranslation[];
}
