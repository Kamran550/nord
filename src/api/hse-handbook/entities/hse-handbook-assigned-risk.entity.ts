import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Company } from '../../companies/entities/company.entity';
import { User } from '../../users/entities/user.entity';
import { HseHandbookAssignedRiskTranslation } from './hse-handbook-assigned-risk-translation.entity';
import { AssignedHseRisk } from '../../assigned-hse-risks/entities/assigned-hse-risk.entity';
import { HseHandbook } from './hse-handbook.entity';



@Entity('hse_handbook_assigned_risks')
export class HseHandbookAssignedRisk {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty()
  @Column()
  companyUuid: string;

  @ManyToOne(() => Company, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_uuid' })
  company: Company;

  @ApiProperty()
  @Column({ type: 'uuid' })
  responsibleUserUuid: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'responsible_user_uuid' })
  responsibleUser: User;

  @ApiProperty()
  @Column()
  lastRevisedByUuid: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'last_revised_by_uuid' })
  lastRevisedBy: User;

  @ApiProperty()
  @Column({ type: 'datetime', precision: 6 })
  lastRevisedAt: Date;

  @ApiProperty()
  @Column()
  assessmentDate: Date;

  @ApiProperty()
  @Column()
  status: number;

  @ApiProperty()
  @Column()
  hseRiskCategory: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ type: 'json' })
  barriers: object;

  @ApiProperty()
  @Column()
  probability: number;

  @ApiProperty()
  @Column()
  consequences: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @Column()
  assignedHseRiskUuid: string;

  @ManyToOne(() => AssignedHseRisk, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'assigned_hse_risk_uuid' })
  assignedHseRisk: AssignedHseRisk;

  @ApiProperty()
  @Column()
  hseHandbookUuid: string;

  @ManyToOne(() => HseHandbook, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hse_handbook_uuid' })
  hseHandbook: HseHandbook;

  @OneToMany(() => HseHandbookAssignedRiskTranslation, entity => entity.hseHandbookAssignedRisk)
  translations: HseHandbookAssignedRiskTranslation[];
}
