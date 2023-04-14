import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { HseHandbook } from '../../hse-handbook/entities/hse-handbook.entity';
import { Company } from '../../companies/entities/company.entity';


export const enum HseHandbookSignatureStatus {
  Sent = 1,
  Signed = 2,
}

@Entity('hse_handbook_signatures')
export class HseHandbookSignature {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty()
  @Column()
  userUuid: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_uuid' })
  user: User;

  @ApiProperty()
  @Column()
  companyUuid: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_uuid' })
  company: Company;

  @ApiProperty()
  @Column()
  handbookUuid: string;

  @ManyToOne(() => HseHandbook)
  @JoinColumn({ name: 'handbook_uuid' })
  handbook: HseHandbook;

  @ApiProperty()
  @Column({ default: 1 })
  status: number;

  @ApiProperty()
  @Column({ nullable: true })
  signature: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
