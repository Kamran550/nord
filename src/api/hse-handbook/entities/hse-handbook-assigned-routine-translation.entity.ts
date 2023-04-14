import {
  Column,
  Entity, JoinColumn,
  ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { HseHandbookAssignedRoutine } from './hse-handbook-assigned-routine.entity';


@Entity('hse_handbook_assigned_routine_translations')
export class HseHandbookAssignedRoutineTranslation {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  // Either System HSE Routine category or Company HSE  Routine category
  @ApiProperty()
  @Column({ nullable: true })
  hseRoutineCategoryName: string;

  @ApiProperty()
  @Column({ nullable: true })
  companyHseRoutineCategoryName: string;


  @Column()
  name: string;

  @Column({
    type: 'blob',
    transformer: {
      to: (value: string) => Buffer.from(value),
      from: (value: Buffer) => value?.toString()
    }
  })
  content: string;

  @Column()
  locale: string;

  @ManyToOne(() => HseHandbookAssignedRoutine, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hse_handbook_assigned_routine_uuid' })
  hseHandbookAssignedRoutine: HseHandbookAssignedRoutine;
}
