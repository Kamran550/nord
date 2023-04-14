import { Injectable } from '@nestjs/common';
import {
  FindWithLangOptions,
  RepositoryWithLang,
} from '../../helpers/repository-with-lang';
import { HseRoutineCategory } from '../hse-routine-categories/entities/hse-routine-category.entity';
import { HseRoutineCategoryTranslation } from '../hse-routine-categories/entities/hse-routine-categories-translations.entity';
import { DataSource } from 'typeorm';
import { IFindOptions } from '../../types';
import { CompanyHseRoutineCategory } from '../company-hse-routine-categories/entities/company-hse-routine-category.entity';
import { CompanyHseRoutineCategoryTranslation } from '../company-hse-routine-categories/entities/company-hse-routine-categories-translations.entity';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { HseRoutineTemplate } from '../hse-routine-templates/entities/hse-routine-template.entity';
import { HseRoutineTemplateTranslation } from '../hse-routine-templates/entities/hse-routine-templates-translations.entity';
import { CompanyHseRoutineTemplate } from '../company-hse-routine-templates/entities/company-hse-routine-template.entity';
import { CompanyHseRoutineTemplateTranslation } from '../company-hse-routine-templates/entities/company-hse-routine-templates-translations.entity';

@Injectable()
export class HseRoutinesService {
  hseRoutineCategoriesRepository: RepositoryWithLang<
    HseRoutineCategory,
    HseRoutineCategoryTranslation
  >;
  companyHseRoutineCategoriesRepository: RepositoryWithLang<
    CompanyHseRoutineCategory,
    CompanyHseRoutineCategoryTranslation
  >;
  hseRoutineTemplatesRepository: RepositoryWithLang<
    HseRoutineTemplate,
    HseRoutineTemplateTranslation
  >;
  companyHseRoutineTemplatesRepository: RepositoryWithLang<
    CompanyHseRoutineTemplate,
    CompanyHseRoutineTemplateTranslation
  >;

  constructor(private dataSource: DataSource) {
    this.hseRoutineCategoriesRepository = new RepositoryWithLang(
      HseRoutineCategory,
      dataSource,
      HseRoutineCategoryTranslation
    );
    this.companyHseRoutineCategoriesRepository = new RepositoryWithLang(
      CompanyHseRoutineCategory,
      dataSource,
      CompanyHseRoutineCategoryTranslation
    );
    this.hseRoutineTemplatesRepository = new RepositoryWithLang(
      HseRoutineTemplate,
      dataSource,
      HseRoutineTemplateTranslation
    );
    this.companyHseRoutineTemplatesRepository = new RepositoryWithLang(
      CompanyHseRoutineTemplate,
      dataSource,
      CompanyHseRoutineTemplateTranslation
    );
  }

  async findAllCategories(options: IFindOptions) {
    const findOptions: FindWithLangOptions = { lang: options.lang };
    if (options.search)
      findOptions.search = { keys: ['name'], value: options.search };
    const response =
      await this.hseRoutineCategoriesRepository.findAndCountWithLang(
        findOptions
      );

    const companyFindOptions: FindManyOptions<CompanyHseRoutineCategory> &
      FindWithLangOptions = { lang: options.lang };
    if (options.user?.companyUuid)
      companyFindOptions.where = { companyUuid: options.user?.companyUuid };
    if (options.search)
      companyFindOptions.search = { keys: ['name'], value: options.search };
    const companyResponse =
      await this.companyHseRoutineCategoriesRepository.findAndCountWithLang(
        companyFindOptions
      );

    const combinedData = [
      ...response.data,
      ...companyResponse.data.map((el) => ({ ...el, isCompanyCategory: true })),
    ];
    const startIndex =
      (options.pagination.page - 1) * options.pagination.pageSize;

    return {
      meta: {
        total: response.meta.total + companyResponse.meta.total,
      },
      data: combinedData
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .slice(startIndex, startIndex + options.pagination.pageSize),
    };
  }

  async findAllTemplates(options: IFindOptions) {
    const findOptions: FindManyOptions<HseRoutineTemplate> &
      FindWithLangOptions = {
      lang: options.lang,
      relations: ['hseRoutineCategory', 'hseRoutineCategory.translations'],
      where: { isVisible: true },
    };
    if (options.search)
      findOptions.search = { keys: ['name'], value: options.search };
    const response =
      await this.hseRoutineTemplatesRepository.findAndCountWithLang(
        findOptions
      );

    const companyFindOptions: FindManyOptions<CompanyHseRoutineTemplate> &
      FindWithLangOptions = { 
        lang: options.lang ,
        relations:['hseRoutineCategory','hseRoutineCategory.translations']
      };
    if (options.user?.companyUuid)
      companyFindOptions.where = { companyUuid: options.user.companyUuid };
    if (options.search)
      companyFindOptions.search = { keys: ['name'], value: options.search };
    const companyResponse =
      await this.companyHseRoutineTemplatesRepository.findAndCountWithLang(
        companyFindOptions
      );

    const combinedData = [
      ...response.data,
      ...companyResponse.data.map((el) => ({ ...el, isCompanyTemplate: true })),
    ];
    const startIndex =
      (options.pagination.page - 1) * options.pagination.pageSize;

    return {
      meta: {
        total: response.meta.total + companyResponse.meta.total,
      },
      data: combinedData
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .slice(startIndex, startIndex + options.pagination.pageSize),
    };
  }
}
