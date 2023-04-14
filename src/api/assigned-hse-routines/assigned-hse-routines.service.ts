import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { CreateAssignedHseRoutineDto } from './dto/create-assigned-hse-routine.dto';
import { UpdateAssignedHseRoutineDto } from './dto/update-assigned-hse-routine.dto';
import {
  FindWithLangOptions,
  RepositoryWithLang,
} from '../../helpers/repository-with-lang';
import { AssignedHseRoutine } from './entities/assigned-hse-routine.entity';
import { IFindOptions, ILangOptions } from '../../types';
import { AssignedHseRoutineTranslation } from './entities/assigned-hse-routines-translations.entity';
import { AssignHseRoutineDto } from './dto/assign-hse-routine.dto';
import { HseRoutineTemplate } from '../hse-routine-templates/entities/hse-routine-template.entity';
import { CompanyHseRoutineTemplate } from '../company-hse-routine-templates/entities/company-hse-routine-template.entity';
import { UpdateMultipleAssignedHseRoutineDto } from './dto/update-multiple-assigned-hse-routine.dto';

@Injectable()
export class AssignedHseRoutinesService {
  assignedHseRoutinesRepository: RepositoryWithLang<
    AssignedHseRoutine,
    AssignedHseRoutineTranslation
  >;

  constructor(private dataSource: DataSource) {
    this.assignedHseRoutinesRepository = new RepositoryWithLang(
      AssignedHseRoutine,
      dataSource,
      AssignedHseRoutineTranslation
    );
  }

  async assign(assignHseRoutineDto: AssignHseRoutineDto) {
    const { templateUuids, ...restDto } = assignHseRoutineDto;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = [];
      for (const templateUuid of templateUuids) {
        let isCompanyTemplate = false;
        let template: HseRoutineTemplate | CompanyHseRoutineTemplate =
          await queryRunner.manager.findOne(HseRoutineTemplate, {
            where: { uuid: templateUuid },
            relations: ['translations'],
          });
        if (!template) {
          isCompanyTemplate = true;
          template = await queryRunner.manager.findOne(
            CompanyHseRoutineTemplate,
            {
              where: { uuid: templateUuid },
              relations: ['translations'],
            }
          );
        }

        if (!template) continue;

        // Prepare object to save
        const objToSave: Partial<AssignedHseRoutine> = {
          ...restDto,
          hseRoutineCategoryUuid: template.hseRoutineCategoryUuid,
          name: template.name,
          content: template.content,
        };
        if (isCompanyTemplate) {
          objToSave.companyHseRoutineCategoryUuid = (
            template as CompanyHseRoutineTemplate
          ).companyHseRoutineCategoryUuid;
          objToSave.companyHseRoutineTemplateUuid = templateUuid;
        } else {
          objToSave.hseRoutineTemplateUuid = templateUuid;
        }

        // Save
        const entity = queryRunner.manager.create(
          AssignedHseRoutine,
          objToSave
        );
        await queryRunner.manager.save(entity);

        for (const translate of template.translations) {
          const entityTranslate = queryRunner.manager.create(
            AssignedHseRoutineTranslation,
            {
              name: translate.name,
              content: translate.content,
              locale: translate.locale,
              assignedHseRoutine: entity,
            }
          );
          await queryRunner.manager.save(entityTranslate);
        }

        result.push(entity);
      }

      if (templateUuids.length === result.length) {
        await queryRunner.commitTransaction();
        return { success: true };
      } else {
        await queryRunner.rollbackTransaction();
        return { success: false };
      }
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async create(
    createAssignedHseRoutineDto: CreateAssignedHseRoutineDto[],
    options: ILangOptions
  ) {
    return this.assignedHseRoutinesRepository.createMultipleWithLang(
      createAssignedHseRoutineDto,
      { ...options, relationKey: 'assignedHseRoutine' }
    );
  }

  async findAll(options: IFindOptions) {
    const findOptions: FindManyOptions<AssignedHseRoutine> &
      FindWithLangOptions = {
      lang: options.lang,
      pagination: options.pagination,
      relations: [
        'responsibleUser',
        'revisedByPerson',
        'hseRoutineCategory',
        'hseRoutineCategory.translations',
      ],
    };
    if (options.user?.companyUuid)
      findOptions.where = { companyUuid: options.user.companyUuid };
    if (options.search)
      findOptions.search = { keys: ['name'], value: options.search };

    return this.assignedHseRoutinesRepository.findAndCountWithLang(findOptions);
  }

  async findOne(id: string, options: ILangOptions) {
    const findOptions: FindOneOptions<AssignedHseRoutine> &
      FindWithLangOptions = {
      where: { uuid: id },
      lang: options.lang,
      hasTranslations: options.hasTranslations,
    };
    if (options.user?.companyUuid)
      findOptions.where = { uuid: id, companyUuid: options.user.companyUuid };

    return this.assignedHseRoutinesRepository.findOneWithLang(findOptions);
  }

  async update(
    id: string,
    updateAssignedHseRoutineDto: UpdateAssignedHseRoutineDto,
    options: ILangOptions
  ) {
    // TODO add company uuid check
    const target = await this.assignedHseRoutinesRepository.findOneBy({
      uuid: id,
    });
    if (!target) return null;

    return this.assignedHseRoutinesRepository.updateWithLang(
      target,
      updateAssignedHseRoutineDto,
      { ...options, relationKey: 'assignedHseRoutine' }
    );
  }

  async updateMultiple(
    updateMultipleAssignedHseRoutineDto: UpdateMultipleAssignedHseRoutineDto,
    options: ILangOptions
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const dataToUpdate: Partial<AssignedHseRoutine> = {};
      if (updateMultipleAssignedHseRoutineDto.responsibleUserUuid)
        dataToUpdate.responsibleUserUuid =
          updateMultipleAssignedHseRoutineDto.responsibleUserUuid;

      if (updateMultipleAssignedHseRoutineDto.revisedByPersonUuid) {
        dataToUpdate.revisedByPersonUuid =
          updateMultipleAssignedHseRoutineDto.revisedByPersonUuid;
      }
      if (updateMultipleAssignedHseRoutineDto.uuids) {
        for (const uuid of updateMultipleAssignedHseRoutineDto.uuids) {
          const target = await queryRunner.manager.findOne(AssignedHseRoutine, {
            where: { uuid: uuid },
            relations: ['translations'],
          });

          await queryRunner.manager.update(
            AssignedHseRoutine,
            { uuid: target.uuid },
            {
              ...dataToUpdate,
            }
          );
        }
      }

      await queryRunner.commitTransaction();

      const result =
        await this.assignedHseRoutinesRepository.findAndCountWithLang({
          where: { uuid: In(updateMultipleAssignedHseRoutineDto.uuids) } as any,
          lang: options.lang,
        });

      return result.data;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async removeMultiple(ids: string[]) {
    const targets = await this.assignedHseRoutinesRepository.findBy({
      uuid: In(ids),
    });
    if (targets.length !== ids.length) return null;

    await this.assignedHseRoutinesRepository.delete({ uuid: In(ids) });
    return { success: true };
  }

  async remove(id: string) {
    const target = await this.assignedHseRoutinesRepository.findOneBy({
      uuid: id,
    });
    if (!target) return null;

    await this.assignedHseRoutinesRepository.delete({ uuid: id });
    return { success: true };
  }
}
