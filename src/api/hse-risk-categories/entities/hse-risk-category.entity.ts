import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { HseRiskCategoryTranslation } from './hse-risk-categories-translations.entity';


@Entity('hse_risk_categories')
export class HseRiskCategory {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => HseRiskCategoryTranslation, entity => entity.hseRiskCategory)
  translations: HseRiskCategoryTranslation[];
}
