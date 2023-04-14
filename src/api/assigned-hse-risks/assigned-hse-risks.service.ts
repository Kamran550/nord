import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { CreateAssignedHseRiskDto } from './dto/create-assigned-hse-risk.dto';
import { UpdateAssignedHseRiskDto } from './dto/update-assigned-hse-risk.dto';
import { FindWithLangOptions, RepositoryWithLang } from '../../helpers/repository-with-lang';
import { AssignedHseRisk } from './entities/assigned-hse-risk.entity';
import { AssignedHseRiskTranslation } from './entities/assigned-hse-risks-translations.entity';
import { IFindOptions, ILangOptions } from '../../types';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { UpdateMultipleAssignedHseRiskDto } from './dto/update-multiple-assigned-hse-risk.dto';


@Injectable()
export class AssignedHseRisksService {
  assignedHseRisksRepository: RepositoryWithLang<AssignedHseRisk, AssignedHseRiskTranslation>;

  constructor(
    private dataSource: DataSource,
  ) {
    this.assignedHseRisksRepository = new RepositoryWithLang(AssignedHseRisk, dataSource, AssignedHseRiskTranslation);
  }

  async create(createAssignedHseRiskDtos: CreateAssignedHseRiskDto[], options: ILangOptions) {
    return this.assignedHseRisksRepository.createMultipleWithLang(
      createAssignedHseRiskDtos.map(el => ({ ...el, lastRevisedByUuid: options.user.uuid })),
      { ...options, relationKey: 'assignedHseRisk' }
    );
  }

  async findAll(options: IFindOptions) {
    const findOptions: FindManyOptions<AssignedHseRisk> & FindWithLangOptions = {
      lang: options.lang,
      pagination: options.pagination,
      relations: ['responsibleUser', 'hseRiskCategory', 'hseRiskCategory.translations'],
      filters: options.filters
    };
    if (options.user?.companyUuid) findOptions.where = { companyUuid: options.user.companyUuid };
    if (options.search) findOptions.search = { keys: ['name'], value: options.search };

    return this.assignedHseRisksRepository.findAndCountWithLang(findOptions);
  }

  async findOne(id: string, options: ILangOptions) {
    const findOptions: FindOneOptions<AssignedHseRisk> & FindWithLangOptions = {
      where: { uuid: id },
      lang: options.lang,
      hasTranslations: options.hasTranslations
    };
    if (options.user?.companyUuid) findOptions.where = { uuid: id, companyUuid: options.user.companyUuid };

    return this.assignedHseRisksRepository.findOneWithLang(findOptions);
  }

  async updateMultiple(updateMultipleAssignedHseRiskDto: UpdateMultipleAssignedHseRiskDto, options: ILangOptions) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const dataToUpdate: Partial<AssignedHseRisk> = { lastRevisedByUuid: options.user.uuid };
      if (updateMultipleAssignedHseRiskDto.assessmentDate) dataToUpdate.assessmentDate = updateMultipleAssignedHseRiskDto.assessmentDate;
      if (updateMultipleAssignedHseRiskDto.responsibleUserUuid) dataToUpdate.responsibleUserUuid = updateMultipleAssignedHseRiskDto.responsibleUserUuid;
      if (updateMultipleAssignedHseRiskDto.status) dataToUpdate.status = updateMultipleAssignedHseRiskDto.status;

      // No changes to barrier implementing deadline
      if (!updateMultipleAssignedHseRiskDto.barrierDeadline) {
        await queryRunner.manager.update(AssignedHseRisk, { uuid: In(updateMultipleAssignedHseRiskDto.uuids) }, dataToUpdate);
      }
      else {
        for (const uuid of updateMultipleAssignedHseRiskDto.uuids) {
          const target = await queryRunner.manager.findOne(AssignedHseRisk, {
            where: { uuid: uuid },
            relations: ['translations']
          });

          await queryRunner.manager.update(AssignedHseRisk, { uuid: target.uuid }, {
            ...dataToUpdate,
            barriers: (target.barriers as Array<any>)
              .map(bar => ({ ...bar, date: updateMultipleAssignedHseRiskDto.barrierDeadline }))
          });

          for (const translate of target.translations) {
            await queryRunner.manager.update(
              AssignedHseRiskTranslation,
              { locale: translate.locale, assignedHseRisk: target },
              {
                barriers: (translate.barriers as Array<any>)
                  .map(bar => ({ ...bar, date: updateMultipleAssignedHseRiskDto.barrierDeadline }))
              }
            );
          }
        }
      }

      await queryRunner.commitTransaction();

      const result = await this.assignedHseRisksRepository.findAndCountWithLang({
        where: ({ uuid: In(updateMultipleAssignedHseRiskDto.uuids) }) as any,
        lang: options.lang
      });
      return result.data;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: string, updateAssignedHseRiskDto: UpdateAssignedHseRiskDto, options: ILangOptions) {
    const findQuery: Record<string, any> = { uuid: id };
    if (options.user?.companyUuid) findQuery.companyUuid = options.user.companyUuid;
    const target = await this.assignedHseRisksRepository.findOneBy(findQuery);
    if (!target) return null;

    return this.assignedHseRisksRepository.updateWithLang(
      target,
      { ...updateAssignedHseRiskDto, lastRevisedByUuid: options.user.uuid },
      { ...options, relationKey: 'assignedHseRisk' }
    );
  }

  async removeMultiple(ids: string[]) {
    const targets = await this.assignedHseRisksRepository.findBy({ uuid: In(ids) });
    if (targets.length !== ids.length) return null;

    await this.assignedHseRisksRepository.delete({ uuid: In(ids) });
    return { success: true };
  }

  async remove(id: string) {
    const target = await this.assignedHseRisksRepository.findOneBy({ uuid: id });
    if (!target) return null;

    await this.assignedHseRisksRepository.delete({ uuid: id });
    return { success: true };
  }
}
