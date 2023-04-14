import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateCompanyHseRoutineTemplateDto } from './dto/create-company-hse-routine-template.dto';
import { UpdateCompanyHseRoutineTemplateDto } from './dto/update-company-hse-routine-template.dto';
import { FindWithLangOptions, RepositoryWithLang } from '../../helpers/repository-with-lang';
import { CompanyHseRoutineTemplate } from './entities/company-hse-routine-template.entity';
import { CompanyHseRoutineTemplateTranslation } from './entities/company-hse-routine-templates-translations.entity';
import { IFindOptions, ILangOptions } from '../../types';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';


@Injectable()
export class CompanyHseRoutineTemplatesService {
  companyHseRoutineTemplatesRepository: RepositoryWithLang<CompanyHseRoutineTemplate, CompanyHseRoutineTemplateTranslation>;

  constructor(private dataSource: DataSource) {
    this.companyHseRoutineTemplatesRepository = new RepositoryWithLang(CompanyHseRoutineTemplate, dataSource, CompanyHseRoutineTemplateTranslation);
  }

  async create(createCompanyHseRoutineTemplateDto: CreateCompanyHseRoutineTemplateDto, options: ILangOptions) {
    return this.companyHseRoutineTemplatesRepository.createWithLang(
      createCompanyHseRoutineTemplateDto, { ...options, relationKey: 'companyHseRoutineTemplate' }
    );
  }

  async findAll(options: IFindOptions) {
    const findOptions: FindManyOptions<CompanyHseRoutineTemplate> & FindWithLangOptions = {
      lang: options.lang,
      relations:['hseRoutineTemplate','hseRoutineCategory','hseRoutineCategory.translations','companyHseRoutineCategory','companyHseRoutineCategory.translations'],
      pagination: options.pagination
    };
    
    if (options.user?.companyUuid) findOptions.where = { companyUuid: options.user.companyUuid };
    if (options.search) findOptions.search = { keys: ['name'], value: options.search };

    return this.companyHseRoutineTemplatesRepository.findAndCountWithLang(findOptions);
  }

  async findOne(id: string, options: ILangOptions) {
    const findOptions: FindOneOptions<CompanyHseRoutineTemplate> & FindWithLangOptions = {
      where: { uuid: id },
      lang: options.lang,
      hasTranslations: options.hasTranslations
    };
    if (options.user?.companyUuid) findOptions.where = { uuid: id, companyUuid: options.user.companyUuid };

    return this.companyHseRoutineTemplatesRepository.findOneWithLang(findOptions);
  }

  async update(id: string, updateCompanyHseRoutineTemplateDto: UpdateCompanyHseRoutineTemplateDto, options: ILangOptions) {
    const query: Record<string, any> = { uuid: id };
    if (options.user?.companyUuid) query.companyUuid = options.user.companyUuid;
    const target = await this.companyHseRoutineTemplatesRepository.findOneBy(query);
    if (!target) return null;

    return this.companyHseRoutineTemplatesRepository.updateWithLang(
      target, updateCompanyHseRoutineTemplateDto, { ...options, relationKey: 'companyHseRoutineTemplate' }
    );
  }

  async remove(id: string, options: ILangOptions) {
    const query: Record<string, any> = { uuid: id };
    if (options.user?.companyUuid) query.companyUuid = options.user.companyUuid;
    const target = await this.companyHseRoutineTemplatesRepository.findOneBy(query);
    if (!target) return null;

    await this.companyHseRoutineTemplatesRepository.delete({ uuid: id });
    return { success: true };
  }
}
