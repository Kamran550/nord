import {
  Column,
  Entity, JoinColumn,
  ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AssignedHseRisk } from './assigned-hse-risk.entity';


@Entity('assigned_hse_risk_translations')
export class AssignedHseRiskTranslation {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @ApiProperty()
  @Column({ type: 'json' })
  barriers: object;

  @Column()
  locale: string;

  @ManyToOne(() => AssignedHseRisk, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'assigned_hse_risk_uuid' })
  assignedHseRisk: AssignedHseRisk;
}
