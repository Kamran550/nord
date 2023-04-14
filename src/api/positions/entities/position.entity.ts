import {
  Column,
  Entity, OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { PositionTranslation } from './position.translation.entity';


@Entity('positions', { synchronize: false })
export class Position {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: true })
  name: string;


  @Column({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @OneToMany(() => PositionTranslation, (positionTranslation) => positionTranslation.position)
  translations: PositionTranslation[];
}
