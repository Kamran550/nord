import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>
  ) {}

  findAll() {
    return this.countryRepository.findAndCount();
  }

  findOne(id: string) {
    return this.countryRepository.findOneBy({ uuid: id });
  }
}
