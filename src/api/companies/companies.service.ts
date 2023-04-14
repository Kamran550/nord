import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>
  ) {}


  create(createCompanyDto: CreateCompanyDto) {
    return createCompanyDto;
  }

  findAll() {
    return this.companyRepository.findAndCount();
  }

  findOne(id: string) {
    return this.companyRepository.findOneBy({ uuid: id });
  }

  findOneBySlug(slug: string) {
    return this.companyRepository.findOne({
      where: { slug },
    });
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return updateCompanyDto;
  }

  remove(id: string) {
    return `This action removes a #${id} company`;
  }
}
