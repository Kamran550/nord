import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { HseRiskCategory } from './hse-risk-category.entity';


@Entity('hse_risk_categories_translations')
export class HseRiskCategoryTranslation {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  locale: string;

  @ManyToOne(() => HseRiskCategory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hse_risk_category_uuid' })
  hseRiskCategory: HseRiskCategory;
}
