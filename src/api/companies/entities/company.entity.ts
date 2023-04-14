import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, JoinColumn,
  ManyToOne, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Country } from '../../countries/entities/country.entity';
import { User } from '../../users/entities/user.entity';
import { OrgStructure } from '../../org-structures/entities/org-structure.entity';


@Entity('companies', { synchronize: false })
export class Company {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  slug: string;

  @ApiProperty()
  @Column({ type: 'longtext' })
  description: string;

  @ApiProperty()
  @Column()
  companyCode: string;

  @ApiProperty()
  @Column()
  vatCode: string;

  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty()
  @Column()
  postCode: string;

  @ApiProperty()
  @Column()
  city: string;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country_uuid' })
  country: Country;

  @ApiProperty()
  @Column()
  website: string;

  @ApiProperty()
  @Column()
  phone: string;

  @ApiProperty()
  @Column()
  breakMinutes: number;

  @ApiProperty()
  @Column()
  workHoursPerDay: number;

  @ApiProperty()
  @Column()
  timeRegistrationAvailability: number;

  @ApiProperty()
  @Column()
  workHoursPerDayChanges: string;

  @ApiProperty()
  @Column()
  firstTimeEmailSentAt: Date;

  @ApiProperty()
  @Column()
  workHoursPerDayOnWeekend: number;

  @ApiProperty()
  @Column()
  workHoursPerDayOnWeekendChanges: string;

  @ApiProperty()
  @Column()
  timeThresholdForBreakTime: number;

  @ApiProperty()
  @Column()
  warehouseResponsibleUuid: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'warehouse_responsible_uuid' })
  warehouseResponsible: User;

  @ApiProperty()
  @Column()
  webRegistered: boolean;

  @ApiProperty()
  @Column()
  isToolsVisible: boolean;

  @ApiProperty()
  @Column({ default: false })
  isHseVisible: boolean;

  @ApiProperty()
  @Column({ nullable: true})
  hseCeoUserUuid: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'hse_ceo_user_uuid' })
  hseCeoUser: User;

  @ApiProperty()
  @Column()
  deactivatedAt: Date;

  @OneToOne(() => OrgStructure, (orgStructure) => orgStructure.company)
  orgStructure: OrgStructure;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
