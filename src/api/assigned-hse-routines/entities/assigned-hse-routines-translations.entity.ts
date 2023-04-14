import {
  Column,
  Entity, JoinColumn,
  ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { AssignedHseRoutine } from './assigned-hse-routine.entity';


@Entity('assigned_hse_routines_translations')
export class AssignedHseRoutineTranslation {
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

  @ManyToOne(() => AssignedHseRoutine, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'assigned_hse_routine_uuid' })
  assignedHseRoutine: AssignedHseRoutine;
}
