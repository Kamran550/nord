import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateCompanyHseRoutineCategoryDto } from './dto/create-company-hse-routine-category.dto';
import { UpdateCompanyHseRoutineCategoryDto } from './dto/update-company-hse-routine-category.dto';
import { FindWithLangOptions, RepositoryWithLang } from '../../helpers/repository-with-lang';
import { CompanyHseRoutineCategory } from './entities/company-hse-routine-category.entity';
import { CompanyHseRoutineCategoryTranslation } from './entities/company-hse-routine-categories-translations.entity';
import { IFindOptions, ILangOptions } from '../../types';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';


@Injectable()
export class CompanyHseRoutineCategoriesService {
  companyHseRoutineCategoriesRepository: RepositoryWithLang<CompanyHseRoutineCategory, CompanyHseRoutineCategoryTranslation>;

  constructor(private dataSource: DataSource) {
    this.companyHseRoutineCategoriesRepository = new RepositoryWithLang(CompanyHseRoutineCategory, dataSource, CompanyHseRoutineCategoryTranslation);
  }

  async create(createCompanyHseRoutineCategoryDto: CreateCompanyHseRoutineCategoryDto, options: ILangOptions) {
    return this.companyHseRoutineCategoriesRepository.createWithLang(
      createCompanyHseRoutineCategoryDto, { ...options, relationKey: 'companyHseRoutineCategory' }
    );
  }

  async findAll(options: IFindOptions) {
    const findOptions: FindManyOptions<CompanyHseRoutineCategory> & FindWithLangOptions = {
      lang: options.lang,
      pagination: options.pagination,
    };
    if (options.user?.companyUuid) findOptions.where = { companyUuid: options.user?.companyUuid };
    if (options.search) findOptions.search = { keys: ['name'], value: options.search };

    return this.companyHseRoutineCategoriesRepository.findAndCountWithLang(findOptions);
  }

  async findOne(id: string, options: ILangOptions) {
    const findOptions: FindOneOptions<CompanyHseRoutineCategory> & FindWithLangOptions = {
      where: { uuid: id },
      lang: options.lang,
      hasTranslations: options.hasTranslations
    };
    if (options.user?.companyUuid) findOptions.where = { uuid: id, companyUuid: options.user.companyUuid };

    return this.companyHseRoutineCategoriesRepository.findOneWithLang(findOptions);
  }

  async update(id: string, updateCompanyHseRoutineCategoryDto: UpdateCompanyHseRoutineCategoryDto, options: ILangOptions) {
    const query: Record<string, any> = { uuid: id };
    if (options.user?.companyUuid) query.companyUuid = options.user.companyUuid;
    const target = await this.companyHseRoutineCategoriesRepository.findOneBy(query);
    if (!target) return null;

    return this.companyHseRoutineCategoriesRepository.updateWithLang(
      target, updateCompanyHseRoutineCategoryDto, { ...options, relationKey: 'companyHseRoutineCategory' }
    );
  }

  async remove(id: string, options: ILangOptions) {
    const query: Record<string, any> = { uuid: id };
    if (options.user?.companyUuid) query.companyUuid = options.user.companyUuid;
    const target = await this.companyHseRoutineCategoriesRepository.findOneBy(query);
    if (!target) return null;

    await this.companyHseRoutineCategoriesRepository.delete({ uuid: id });

    return { success: true };
  }
}
