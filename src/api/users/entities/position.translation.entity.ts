import {
  Column,
  Entity, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Position } from './position.entity';


@Entity('positions_translations', { synchronize: false })
export class PositionTranslation {
  @PrimaryGeneratedColumn('uuid')
  position_uuid: string;

  @ManyToOne(() => Position)
  @JoinColumn({ name: 'position_uuid' })
  position: Position;

  @Column({ nullable: true })
  name: string;

  @Column()
  locale: string;
}
