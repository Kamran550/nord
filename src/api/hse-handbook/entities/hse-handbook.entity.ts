import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Company } from '../../companies/entities/company.entity';
import { User } from '../../users/entities/user.entity';
import { HseHandbookAssignedRisk } from './hse-handbook-assigned-risk.entity';
import { HseHandbookAssignedRoutine } from './hse-handbook-assigned-routine.entity';

@Entity('hse_handbooks')
export class HseHandbook {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty()
  @Column()
  templateVersion: string;

  @ApiProperty()
  @Column()
  version: number;

  @ApiProperty()
  @Column()
  safetyType: string;

  @ApiProperty()
  @Column()
  safetyRepresentativeUuid: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'safety_representative_uuid' })
  safetyRepresentative: User;

  @ApiProperty()
  @Column()
  companyUuid: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_uuid' })
  company: Company;

  @ApiProperty()
  @Column()
  createdByUuid: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by_uuid' })
  createdBy: User;

  @ApiProperty()
  @Column()
  lastRevisedByUuid: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'last_revised_by_uuid' })
  lastRevisedBy: User;

  @ApiProperty()
  @Column()
  lastRevisedAt: Date;

  @ApiProperty()
  @Column({ type: 'json' })
  companyInfo: object;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => HseHandbookAssignedRisk, entity => entity.hseHandbook)
  risks: HseHandbookAssignedRisk[];

  @OneToMany(() => HseHandbookAssignedRoutine, entity => entity.hseHandbook)
  routines: HseHandbookAssignedRoutine[];

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
