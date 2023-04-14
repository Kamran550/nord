import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { HseRoutineCategory } from './hse-routine-category.entity';


@Entity('hse_routine_categories_translations')
export class HseRoutineCategoryTranslation {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  locale: string;

  @ManyToOne(() => HseRoutineCategory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hse_routine_category_uuid' })
  hseRoutineCategory: HseRoutineCategory;
}
