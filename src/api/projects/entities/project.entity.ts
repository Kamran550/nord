import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Company } from '../../companies/entities/company.entity';
import { User } from '../../users/entities/user.entity';


@Entity('projects', { synchronize: false })
export class Project {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty()
  @Column()
  uniqueId: string;

  @ApiProperty()
  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_uuid' })
  company: Company;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  workStartAt: Date;

  @ApiProperty()
  @Column()
  workEndAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'client_uuid' })
  client: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'responsible_uuid' })
  responsible: User;

  @ApiProperty()
  @Column()
  defaultGroups: string;

  @ApiProperty()
  @Column()
  createdAt: Date;

  @ApiProperty()
  @Column()
  updatedAt: Date;

  @ApiProperty()
  @Column()
  deletedAt: Date;
}
