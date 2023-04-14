import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Company } from '../../companies/entities/company.entity';
import { User } from '../../users/entities/user.entity';
import { HseHandbook } from './hse-handbook.entity';

@Entity('hse_handbook_org_structures')
export class HseHandbookOrgStructure {
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
  @Column()
  lastRevisedByUuid: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'last_revised_by_uuid' })
  lastRevisedBy: User;

  @ApiProperty()
  @Column()
  hseHandbookUuid: string;

  @ManyToOne(() => HseHandbook, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hse_handbook_uuid' })
  hseHandbook: HseHandbook;

  @ApiProperty()
  @Column({ type: 'json' })
  structure: object;

  @ApiProperty()
  @Column({ type: 'datetime', precision: 6 })
  lastRevisedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
