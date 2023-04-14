import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateCompanyHseRiskTemplateDto } from './dto/create-company-hse-risk-template.dto';
import { UpdateCompanyHseRiskTemplateDto } from './dto/update-company-hse-risk-template.dto';
import { FindWithLangOptions, RepositoryWithLang } from '../../helpers/repository-with-lang';
import { CompanyHseRiskTemplate } from './entities/company-hse-risk-template.entity';
import { CompanyHseRiskTemplateTranslation } from './entities/company-hse-risk-templates-translations.entity';
import { IFindOptions, ILangOptions } from '../../types';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';


@Injectable()
export class CompanyHseRiskTemplatesService {
  companyHseRiskTemplatesRepository: RepositoryWithLang<CompanyHseRiskTemplate, CompanyHseRiskTemplateTranslation>;

  constructor(private dataSource: DataSource) {
    this.companyHseRiskTemplatesRepository = new RepositoryWithLang(CompanyHseRiskTemplate, dataSource, CompanyHseRiskTemplateTranslation);
  }

  async create(createCompanyHseRiskTemplateDto: CreateCompanyHseRiskTemplateDto, options: ILangOptions) {
    return this.companyHseRiskTemplatesRepository.createWithLang(
      createCompanyHseRiskTemplateDto, { ...options, relationKey: 'companyHseRiskTemplate' }
    );
  }

  async findAll(options: IFindOptions) {
    const findOptions: FindManyOptions<CompanyHseRiskTemplate> & FindWithLangOptions = {
      lang: options.lang,
      pagination: options.pagination
    };
    if (options.user?.companyUuid) findOptions.where = { companyUuid: options.user.companyUuid };
    if (options.search) findOptions.search = { keys: ['name'], value: options.search };

    return this.companyHseRiskTemplatesRepository.findAndCountWithLang(findOptions);
  }

  async findOne(id: string, options: ILangOptions) {
    const findOptions: FindOneOptions<CompanyHseRiskTemplate> & FindWithLangOptions = {
      where: { uuid: id },
      lang: options.lang,
      hasTranslations: options.hasTranslations,
    };
    if (options.user?.companyUuid) findOptions.where = { uuid: id, companyUuid: options.user.companyUuid };

    return this.companyHseRiskTemplatesRepository.findOneWithLang(findOptions);
  }

  async update(id: string, updateCompanyHseRiskTemplateDto: UpdateCompanyHseRiskTemplateDto, options: ILangOptions) {
    const target = await this.companyHseRiskTemplatesRepository.findOneBy({ uuid: id });
    if (!target) return null;

    return this.companyHseRiskTemplatesRepository.updateWithLang(
      target, updateCompanyHseRiskTemplateDto, { ...options, relationKey: 'companyHseRiskTemplate' }
    );
  }

  async remove(id: string) {
    const target = await this.companyHseRiskTemplatesRepository.findOneBy({ uuid: id });
    if (!target) return null;

    await this.companyHseRiskTemplatesRepository.delete({ uuid: id });
    return { success: true };
  }
}
