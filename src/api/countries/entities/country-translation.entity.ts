import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Country } from './country.entity';

@Entity('countries_translations', { synchronize: false })
export class CountryTranslation {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  locale: string;

  @ApiProperty()
  @Column()
  countryUuid: string;

  @ManyToOne(() => Country, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'country_uuid' })
  country: Country;
}
