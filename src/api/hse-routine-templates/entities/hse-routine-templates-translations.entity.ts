import {
  Column,
  Entity, JoinColumn,
  ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { HseRoutineTemplate } from './hse-routine-template.entity';


@Entity('hse_routine_templates_translations')
export class HseRoutineTemplateTranslation {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column({
    type: 'blob',
    transformer: {
      to: (value: string) => Buffer.from(value),
      from: (value: Buffer) => value.toString()
    }
  })
  content: string;

  @Column()
  locale: string;

  @ManyToOne(() => HseRoutineTemplate, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hse_routine_template_uuid' })
  hseRoutineTemplate: HseRoutineTemplate;
}
