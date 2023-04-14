import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyHseRoutineCategory } from './company-hse-routine-category.entity';


@Entity('company_hse_routine_categories_translations')
export class CompanyHseRoutineCategoryTranslation {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  locale: string;

  @ManyToOne(() => CompanyHseRoutineCategory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_hse_routine_category_uuid' })
  companyHseRoutineCategory: CompanyHseRoutineCategory;
}
