import {
  Column,
  Entity, JoinColumn,
  ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { HseHandbookAssignedRisk } from './hse-handbook-assigned-risk.entity';


@Entity('hse_handbook_assigned_risk_translations')
export class HseHandbookAssignedRiskTranslation {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty()
  @Column()
  hseRiskCategory: string;

  @Column()
  name: string;

  @ApiProperty()
  @Column({ type: 'json' })
  barriers: object;

  @Column()
  locale: string;

  @ManyToOne(() => HseHandbookAssignedRisk, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hse_handbook_assigned_risk_uuid' })
  hseHandbookAssignedRisk: HseHandbookAssignedRisk;
}
