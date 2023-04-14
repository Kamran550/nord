import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('countries', { synchronize: false })
export class Country {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  index: number;

  @ApiProperty()
  @Column({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @ApiProperty()
  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
