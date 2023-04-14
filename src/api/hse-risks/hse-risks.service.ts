import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { IFindOptions } from '../../types';
import { FindWithLangOptions, RepositoryWithLang } from '../../helpers/repository-with-lang';
import { HseRiskTemplate } from '../hse-risk-templates/entities/hse-risk-template.entity';
import { HseRiskTemplateTranslation } from '../hse-risk-templates/entities/hse-risk-templates-translations.entity';
import { CompanyHseRiskTemplate } from '../company-hse-risk-templates/entities/company-hse-risk-template.entity';
import { CompanyHseRiskTemplateTranslation } from '../company-hse-risk-templates/entities/company-hse-risk-templates-translations.entity';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';


@Injectable()
export class HseRisksService {
  hseRiskTemplatesRepository: RepositoryWithLang<HseRiskTemplate, HseRiskTemplateTranslation>;
  companyHseRiskTemplatesRepository: RepositoryWithLang<CompanyHseRiskTemplate, CompanyHseRiskTemplateTranslation>;

  constructor(private dataSource: DataSource) {
    this.hseRiskTemplatesRepository = new RepositoryWithLang(HseRiskTemplate, dataSource, HseRiskTemplateTranslation);
    this.companyHseRiskTemplatesRepository = new RepositoryWithLang(CompanyHseRiskTemplate, dataSource, CompanyHseRiskTemplateTranslation);
  }

  async findAllTemplates(options: IFindOptions) {
    const findOptions: FindManyOptions<HseRiskTemplate> & FindWithLangOptions = {
      lang: options.lang,
      relations: ['hseRiskCategory', 'hseRiskCategory.translations'],
      where: { isVisible: true },
      filters: options.filters
    };
    if (options.search) findOptions.search = { keys: ['name'], value: options.search };

    const response = await this.hseRiskTemplatesRepository.findAndCountWithLang(findOptions);

    const companyFindOptions: FindManyOptions<CompanyHseRiskTemplate> & FindWithLangOptions = {
      lang: options.lang,
      relations: ['hseRiskCategory', 'hseRiskCategory.translations'],
      filters: options.filters
    };
    if (options.user?.companyUuid) companyFindOptions.where = { companyUuid: options.user.companyUuid };
    if (options.search) companyFindOptions.search = { keys: ['name'], value: options.search };

    const companyResponse = await this.companyHseRiskTemplatesRepository.findAndCountWithLang(companyFindOptions);

    const combinedData = [...response.data, ...companyResponse.data.map(el => ({ ...el, isCompanyTemplate: true }))];
    const startIndex = (options.pagination.page - 1) * options.pagination.pageSize;

    return {
      meta: {
        total: response.meta.total + companyResponse.meta.total,
      },
      data: combinedData
        .sort((a, b) => a.name > b.name ? 1 : -1)
        .slice(startIndex, startIndex + options.pagination.pageSize)
    };
  }
}
