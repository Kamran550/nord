import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { HseRoutineCategoryTranslation } from './hse-routine-categories-translations.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('hse_routine_categories')
export class HseRoutineCategory {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty()
  @Column({ unique: true})
  name: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => HseRoutineCategoryTranslation,
    (entity) => entity.hseRoutineCategory
  )
  translations: HseRoutineCategoryTranslation[];
}
