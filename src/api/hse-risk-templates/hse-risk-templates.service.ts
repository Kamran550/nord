import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateHseRiskTemplateDto } from './dto/create-hse-risk-template.dto';
import { UpdateHseRiskTemplateDto } from './dto/update-hse-risk-template.dto';
import {
  FindWithLangOptions,
  RepositoryWithLang,
} from '../../helpers/repository-with-lang';
import { HseRiskTemplate } from './entities/hse-risk-template.entity';
import { HseRiskTemplateTranslation } from './entities/hse-risk-templates-translations.entity';
import { IFindOptions, ILangOptions } from '../../types';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { AssignedHseRisk } from '../assigned-hse-risks/entities/assigned-hse-risk.entity';
import { AssignedHseRiskTranslation } from '../assigned-hse-risks/entities/assigned-hse-risks-translations.entity';

@Injectable()
export class HseRiskTemplatesService {
  hseRiskTemplatesRepository: RepositoryWithLang<
    HseRiskTemplate,
    HseRiskTemplateTranslation
  >;
  assignedHseRiskRepository: RepositoryWithLang<
    AssignedHseRisk,
    AssignedHseRiskTranslation
  >;

  constructor(private dataSource: DataSource) {
    this.hseRiskTemplatesRepository = new RepositoryWithLang(
      HseRiskTemplate,
      dataSource,
      HseRiskTemplateTranslation
    );
    this.assignedHseRiskRepository = new RepositoryWithLang(
      AssignedHseRisk,
      dataSource,
      AssignedHseRiskTranslation
    );
  }

  async create(
    createHseRiskTemplateDto: CreateHseRiskTemplateDto,
    options: ILangOptions
  ) {
    return this.hseRiskTemplatesRepository.createWithLang(
      createHseRiskTemplateDto,
      { ...options, relationKey: 'hseRiskTemplate' }
    );
  }

  async findAll(options: IFindOptions) {
    const findOptions: FindManyOptions<HseRiskTemplate> & FindWithLangOptions =
      {
        lang: options.lang,
        pagination: options.pagination,
        relations: ['hseRiskCategory', 'hseRiskCategory.translations'],
      };
    if (options.search)
      findOptions.search = { keys: ['name'], value: options.search };

    return this.hseRiskTemplatesRepository.findAndCountWithLang(findOptions);
  }

  async findOne(id: string, options: ILangOptions) {
    return this.hseRiskTemplatesRepository.findOneWithLang({
      where: { uuid: id },
      lang: options.lang,
      hasTranslations: options.hasTranslations,
    });
  }

  async update(
    id: string,
    updateHseRiskTemplateDto: UpdateHseRiskTemplateDto,
    options: ILangOptions
  ) {
    const target = await this.hseRiskTemplatesRepository.findOneBy({
      uuid: id,
    });
    if (!target) return null;

    return this.hseRiskTemplatesRepository.updateWithLang(
      target,
      updateHseRiskTemplateDto,
      { ...options, relationKey: 'hseRiskTemplate' }
    );
  }

  async remove(id: string) {
    const target = await this.hseRiskTemplatesRepository.findOneBy({
      uuid: id,
    });
   
    if (!target) return null;

    await this.assignedHseRiskRepository.delete({
      hseRiskTemplate: { uuid: id },
    });
    await this.hseRiskTemplatesRepository.delete({ uuid: id });
    return { success: true };
  }
}
