import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { HseRoutineTemplateTranslation } from './hse-routine-templates-translations.entity';
import { HseRoutineCategory } from '../../hse-routine-categories/entities/hse-routine-category.entity';


@Entity('hse_routine_templates')
export class HseRoutineTemplate {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  hseRoutineCategoryUuid: string;

  @ApiProperty()
  @ManyToOne(() => HseRoutineCategory)
  @JoinColumn({ name: 'hse_routine_category_uuid' })
  hseRoutineCategory: HseRoutineCategory;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({
    type: 'blob',
    transformer: {
      to: (value: string) => Buffer.from(value),
      from: (value: Buffer) => value.toString()
    }
  })
  content: string;

  @ApiProperty()
  @Column()
  isVisible: boolean;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => HseRoutineTemplateTranslation, entity => entity.hseRoutineTemplate)
  translations: HseRoutineTemplateTranslation[];
}
