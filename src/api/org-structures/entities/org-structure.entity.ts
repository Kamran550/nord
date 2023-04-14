import {
  Column, CreateDateColumn,
  Entity, JoinColumn, ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import { Company } from '../../companies/entities/company.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';


@Entity('org_structures',)
export class OrgStructure {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty()
  @Column()
  companyUuid: string;

  @OneToOne(() => Company, (company) => company.orgStructure)
  @JoinColumn({ name: 'company_uuid' })
  company: Company;

  @ApiProperty()
  @Column({ type: 'json' })
  structure: object;

  @ApiProperty()
  @Column()
  lastRevisedByUuid: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'last_revised_by_uuid' })
  lastRevisedBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
