import { Injectable } from '@nestjs/common';
import { CreateHseRoutineCategoryDto } from './dto/create-hse-routine-category.dto';
import { UpdateHseRoutineCategoryDto } from './dto/update-hse-routine-category.dto';
import { DataSource } from 'typeorm';
import { HseRoutineCategory } from './entities/hse-routine-category.entity';
import { HseRoutineCategoryTranslation } from './entities/hse-routine-categories-translations.entity';
import { FindWithLangOptions, RepositoryWithLang } from '../../helpers/repository-with-lang';
import { IFindOptions, ILangOptions } from '../../types';


@Injectable()
export class HseRoutineCategoriesService {
  hseRoutineCategoriesRepository: RepositoryWithLang<HseRoutineCategory, HseRoutineCategoryTranslation>;

  constructor(private dataSource: DataSource) {
    this.hseRoutineCategoriesRepository = new RepositoryWithLang(HseRoutineCategory, dataSource, HseRoutineCategoryTranslation);
  }

  async create(createHseRoutineCategoryDto: CreateHseRoutineCategoryDto, options: ILangOptions) {
    return this.hseRoutineCategoriesRepository.createWithLang(
      createHseRoutineCategoryDto, { ...options, relationKey: 'hseRoutineCategory' }
    );
  }

  async findAll(options: IFindOptions) {
    const findOptions: FindWithLangOptions = {
      lang: options.lang,
      pagination: options.pagination
    };
    if (options.search) findOptions.search = { keys: ['name'], value: options.search };

    return this.hseRoutineCategoriesRepository.findAndCountWithLang(findOptions);
  }

  async findOne(id: string, options: ILangOptions) {
    return this.hseRoutineCategoriesRepository.findOneWithLang({
      where: { uuid: id },
      lang: options.lang,
      hasTranslations: options.hasTranslations
    });
  }

  async update(id: string, updateHseRoutineCategoryDto: UpdateHseRoutineCategoryDto, options: ILangOptions) {
    const target = await this.hseRoutineCategoriesRepository.findOneBy({ uuid: id });
    if (!target) return null;

    return this.hseRoutineCategoriesRepository.updateWithLang(
      target, updateHseRoutineCategoryDto, { ...options, relationKey: 'hseRoutineCategory' }
    );
  }

  async remove(id: string) {
    const target = await this.hseRoutineCategoriesRepository.findOneBy({ uuid: id });
    if (!target) return null;

    await this.hseRoutineCategoriesRepository.delete({ uuid: id });

    return { success: true };
  }
}
