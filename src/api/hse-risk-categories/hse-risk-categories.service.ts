import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateHseRiskCategoryDto } from './dto/create-hse-risk-category.dto';
import { UpdateHseRiskCategoryDto } from './dto/update-hse-risk-category.dto';
import { FindWithLangOptions, RepositoryWithLang } from '../../helpers/repository-with-lang';
import { HseRiskCategory } from './entities/hse-risk-category.entity';
import { HseRiskCategoryTranslation } from './entities/hse-risk-categories-translations.entity';
import { IFindOptions, ILangOptions } from '../../types';


@Injectable()
export class HseRiskCategoriesService {
  hseRiskCategoriesRepository: RepositoryWithLang<HseRiskCategory, HseRiskCategoryTranslation>;

  constructor(private dataSource: DataSource) {
    this.hseRiskCategoriesRepository = new RepositoryWithLang(HseRiskCategory, dataSource, HseRiskCategoryTranslation);
  }

  async create(createHseRiskCategoryDto: CreateHseRiskCategoryDto, options: ILangOptions) {
    return this.hseRiskCategoriesRepository.createWithLang<CreateHseRiskCategoryDto>(
      createHseRiskCategoryDto, { ...options, relationKey: 'hseRiskCategory' }
    );
  }

  async findAll(options: IFindOptions) {
    const findOptions: FindWithLangOptions = {
      lang: options.lang,
      pagination: options.pagination
    };
    if (options.search) findOptions.search = { keys: ['name'], value: options.search };

    return this.hseRiskCategoriesRepository.findAndCountWithLang(findOptions);
  }

  async findOne(id: string, options: ILangOptions) {
    return this.hseRiskCategoriesRepository.findOneWithLang({
      where: { uuid: id },
      lang: options.lang,
      hasTranslations: options.hasTranslations
    });
  }

  async update(id: string, updateHseRiskCategoryDto: UpdateHseRiskCategoryDto, options: ILangOptions) {
    const target = await this.hseRiskCategoriesRepository.findOneBy({ uuid: id });
    if (!target) return null;

    return this.hseRiskCategoriesRepository.updateWithLang<UpdateHseRiskCategoryDto>(
      target, updateHseRiskCategoryDto, { ...options, relationKey: 'hseRiskCategory' }
    );
  }

  async remove(id: string) {
    const target = await this.hseRiskCategoriesRepository.findOneBy({ uuid: id });
    if (!target) return null;

    await this.hseRiskCategoriesRepository.delete({ uuid: id });

    return { success: true };
  }
}
