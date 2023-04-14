import { Injectable } from '@nestjs/common';
import type { Response } from 'express';
import * as wkhtmltopdf from 'wkhtmltopdf';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { readFileSync, writeFileSync, unlink } from 'fs';
import * as hbs from 'hbs';
import { User } from '../users/entities/user.entity';
import { format, formatWithTime } from '../../helpers/format-date';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DataSource, In, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Company } from '../companies/entities/company.entity';
import {
  AssignedHseRisk,
  RiskConsequences,
  RiskProbability,
  RiskStatusReverse,
  RiskStatus
} from '../assigned-hse-risks/entities/assigned-hse-risk.entity';
import { HseHandbookAssignedRisk } from './entities/hse-handbook-assigned-risk.entity';
import { HseHandbookAssignedRiskTranslation } from './entities/hse-handbook-assigned-risk-translation.entity';
import { HseHandbook } from './entities/hse-handbook.entity';
import { IFindOptions } from '../../types';
import calcTakeAndSkip from '../../helpers/calc-take-and-skip';
import { AssignedHseRoutine } from '../assigned-hse-routines/entities/assigned-hse-routine.entity';
import { HseHandbookAssignedRoutine } from './entities/hse-handbook-assigned-routine.entity';
import { HseHandbookAssignedRoutineTranslation } from './entities/hse-handbook-assigned-routine-translation.entity';
import { HseHandbookSignaturesService } from '../hse-handbook-signatures/hse-handbook-signatures.service';
import { OrgStructuresService } from '../org-structures/org-structures.service';
import { HseHandbookOrgStructure } from './entities/hse-handbook-org-structure.entity';

wkhtmltopdf.command = process.env.WKHTMLTOPDF_PATH;
wkhtmltopdf.shell = process.env.WKHTMLTOPDF_SH || wkhtmltopdf.shell;


const riskMatrix = [
  [1, 2, 3, 4, 5],
  [2, 4, 6, 8, 10],
  [3, 6, 9, 12, 15],
  [4, 8, 12, 15, 20],
  [5, 10, 15, 20, 25],
];


@Injectable()
export class HseHandbookService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(AssignedHseRisk)
    private risksRepository: Repository<AssignedHseRisk>,
    @InjectRepository(AssignedHseRoutine)
    private routinesRepository: Repository<AssignedHseRoutine>,
    @InjectRepository(HseHandbook)
    private hseHandbooksRepository: Repository<HseHandbook>,
    @InjectRepository(HseHandbookAssignedRisk)
    private hseHandbookAssignedRisksRepository: Repository<HseHandbookAssignedRisk>,
    @InjectRepository(HseHandbookAssignedRoutine)
    private hseHandbookAssignedRoutinesRepository: Repository<HseHandbookAssignedRoutine>,
    @InjectRepository(HseHandbookOrgStructure)
    private hseHandbookOrgStructuresRepository: Repository<HseHandbookOrgStructure>,
    private hseHandbookSignaturesService: HseHandbookSignaturesService,
    private orgStructureService: OrgStructuresService
  ) {}

  async getPdfForNewVersion(res: Response, { user, params, lang }: { user: User; params?: any, lang: string }) {
    const company = await this.companyRepository.findOne({
      where: { uuid: user.company.uuid },
      relations: ['country', 'hseCeoUser']
    });
    const representativeUser = await this.usersRepository.findOneBy({ uuid: params?.representativeUserUuid });
    const employeesCount = await this.usersRepository.count({ where: { companyUuid: user.company.uuid, statusUuid: 'user.active' } });
    const risks = await this.risksRepository.find({
      where: { companyUuid: user.company.uuid },
      relations: ['responsibleUser']
    });
    const routines = await this.routinesRepository.find({
      where: { companyUuid: company.uuid },
      relations: ['responsibleUser', 'revisedByPerson']
    });
    const lastChangesInfo = await this.isNewVersionAvailable(user);
    const orgStructure = await this.orgStructureService.findOne(user.companyUuid);

    const printData = {
      company_name: company?.name,
      company_code: company?.companyCode || '-',
      company_phone: company?.phone || '-',
      company_address: company?.address || '-',
      company_postcode: company?.postCode || '-',
      company_city: company?.city || '-',
      company_country: company?.country?.name || '-',
      company_website: company?.website || '-',
      handbook_version: await this.getLastHandbookVersion(user) + 1,
      handbook_creation_date: format(new Date()),
      created_by_name: user.firstName,
      created_by_lastname: user.lastName,
      last_revised_by_name: lastChangesInfo.lastChangeBy?.firstName || '-',
      last_revised_by_lastname: lastChangesInfo.lastChangeBy?.lastName || '-',
      last_revised_date: format(lastChangesInfo.lastChangeAt),
      number_of_employees: employeesCount,
      ceo_fullname: company.hseCeoUser?.fullName,
      representative_fullname: representativeUser?.fullName,
      risks: risks.map((risk, index) => {
        const riskLevel = riskMatrix[risk.probability - 1][risk.consequences - 1];
        const riskLevelColor = riskLevel >= 10 ? 'red' : riskLevel >= 5 ? 'yellow' : 'green';

        return {
          ...risk,
          priority: index + 1,
          probability: RiskProbability[risk.probability],
          consequence: RiskConsequences[risk.consequences],
          risk_level: riskLevel,
          risk_level_color: riskLevelColor,
          assessment_date: format(risk.assessmentDate),
          responsible_user: risk.responsibleUser.fullName,
          status: RiskStatusReverse[risk.status]
        };
      }),
      routines: routines.map(routine => ({
        name: routine.name,
        version: routine.version,
        last_revised_by: routine.revisedByPerson?.fullName,
        last_revised_date: format(routine.updatedAt),
        responsible_user: routine.responsibleUser?.fullName,
        content: routine.content
      })),
      orgStructure: this.orgStructureService.getOrgStructureHtml(orgStructure, lang),
      isEjectSafety: params.safety === 'eject',
      isAgreementNotToHave: params.safety === 'agreement-not-to-have',
      isHseDeclarationVisible: true,
      isCompanyInformationVisible: true,
      isSafetyVisible: true,
      isOrgStructureVisible: true,
      isRiskAssessmentVisible: true,
      isHseRoutinesVisible: true,
      isReadConfirmationsVisible: false,
      showSignatures: false
    };

    return this.getPdf(res, printData);
  }

  async getPdfForExistingVersion(res: Response, { user, params, lang }: { user: User; params?: any, lang: string }) {
    const hseHandbook = await this.hseHandbooksRepository.findOne({
      where: { uuid: params.hseHandbookUuid },
      relations: ['safetyRepresentative', 'createdBy', 'lastRevisedBy']
    });
    const companyInfo = hseHandbook?.companyInfo as Company;
    const employeesCount = await this.usersRepository.count({ where: { companyUuid: user.company.uuid, statusUuid: 'user.active' } });

    // Apply Risk filters
    const statusFilters = [];
    if (params.isInProgress || !('isInProgress' in params)) statusFilters.push(RiskStatus.InProgress);
    if (params.isCompleted || !('isCompleted' in params)) statusFilters.push(RiskStatus.Completed);
    const riskFilters: Record<string, any> = { status: In(statusFilters) };
    if (params.dateFrom && params.dateTo) riskFilters.assessmentDate = Between(params.dateFrom, params.dateTo);
    else if (params.dateFrom) riskFilters.assessmentDate = MoreThanOrEqual(params.dateFrom);
    else if (params.dateTo) riskFilters.assessmentDate = LessThanOrEqual(params.dateTo);
    const risks = await this.hseHandbookAssignedRisksRepository.find({
      where: { hseHandbookUuid: hseHandbook.uuid, ...riskFilters },
      relations: ['responsibleUser'],
    });

    const routines = await this.hseHandbookAssignedRoutinesRepository.find({
      where: { hseHandbookUuid: hseHandbook.uuid },
      relations: ['responsibleUser', 'lastRevisedBy']
    });
    const orgStructure = await this.hseHandbookOrgStructuresRepository.findOneBy({ hseHandbookUuid: hseHandbook.uuid });


    const printData = {
      company_name: companyInfo?.name,
      company_code: companyInfo?.companyCode || '-',
      company_phone: companyInfo?.phone || '-',
      company_address: companyInfo?.address || '-',
      company_postcode: companyInfo?.postCode || '-',
      company_city: companyInfo?.city || '-',
      company_country: companyInfo?.country || '-',
      company_website: companyInfo?.website || '-',
      handbook_version: hseHandbook.version,
      handbook_creation_date: format(hseHandbook.createdAt),
      created_by_name: hseHandbook.createdBy?.firstName,
      created_by_lastname: hseHandbook.createdBy?.lastName,
      last_revised_by_name: hseHandbook.lastRevisedBy?.firstName,
      last_revised_by_lastname: hseHandbook.lastRevisedBy?.lastName,
      last_revised_date: format(hseHandbook.lastRevisedAt),
      number_of_employees: employeesCount,
      ceo_fullname: companyInfo?.hseCeoUser,
      representative_fullname: hseHandbook.safetyRepresentative?.fullName,
      risks: risks.map((risk, index) => {
        const riskLevel = riskMatrix[risk.probability - 1][risk.consequences - 1];
        const riskLevelColor = riskLevel >= 10 ? 'red' : riskLevel >= 5 ? 'yellow' : 'green';

        return {
          ...risk,
          priority: index + 1,
          probability: RiskProbability[risk.probability],
          consequence: RiskConsequences[risk.consequences],
          risk_level: riskLevel,
          risk_level_color: riskLevelColor,
          assessment_date: format(risk.assessmentDate),
          responsible_user: risk.responsibleUser.fullName,
          status: RiskStatusReverse[risk.status]
        };
      }),
      routines: routines.map(routine => ({
        name: routine.name,
        version: routine.version,
        last_revised_by: routine.lastRevisedBy?.fullName,
        last_revised_date: format(routine.lastRevisedAt),
        responsible_user: routine.responsibleUser?.fullName,
        content: routine.content
      })),
      orgStructure: orgStructure ? this.orgStructureService.getOrgStructureHtml(orgStructure, lang) : '-',
      isEjectSafety: hseHandbook.safetyType === 'eject',
      isAgreementNotToHave: hseHandbook.safetyType === 'agreement-not-to-have',
      isHseDeclarationVisible: params.isHseDeclarationVisible || !('isHseDeclarationVisible' in params),
      isCompanyInformationVisible: params.isCompanyInformationVisible || !('isCompanyInformationVisible' in params),
      isSafetyVisible: params.isSafetyVisible || !('isSafetyVisible' in params),
      isOrgStructureVisible: params.isOrgStructureVisible || !('isOrgStructureVisible' in params),
      isRiskAssessmentVisible: params.isRiskAssessmentVisible || !('isRiskAssessmentVisible' in params),
      isHseRoutinesVisible: params.isHseRoutinesVisible || !('isHseRoutinesVisible' in params),
      isReadConfirmationsVisible: false,
      showSignatures: false
    };

    return this.getPdf(res, printData);
  }

  async approve({ user, params }: { user: User; params?: any }) {
    const previousHandbook = await this.hseHandbooksRepository.findOne({
      where: { companyUuid: user.company.uuid },
      order: { createdAt: 'DESC' },
      relations: ['routines'],
    });

    const company = await this.companyRepository.findOne({
      where: { uuid: user.company.uuid },
      relations: ['country', 'hseCeoUser']
    });
    const employeesCount = await this.usersRepository.count({ where: { companyUuid: user.company.uuid, statusUuid: 'user.active' } });
    const risks = await this.risksRepository.find({
      where: { companyUuid: user.company.uuid },
      relations: [
        'responsibleUser',
        'translations',
        'hseRiskCategory',
        'hseRiskCategory.translations'
      ]
    });
    const routines = await this.routinesRepository.find({
      where: { companyUuid: user.company.uuid },
      relations: [
        'translations',
        'responsibleUser',
        'hseRoutineCategory',
        'hseRoutineCategory.translations',
        'companyHseRoutineCategory',
        'companyHseRoutineCategory.translations'
      ]
    });
    const orgStructure = await this.orgStructureService.findOne(user.companyUuid);
    const companyInfo = {
      name: company?.name,
      companyCode: company?.companyCode,
      phone: company?.phone,
      address: company?.address,
      postCode: company?.postCode,
      city: company?.city,
      country: company?.country?.name,
      website: company?.website,
      hseCeoUser: company.hseCeoUser?.fullName,
      hseCeoUserUuid: company.hseCeoUser?.uuid,
      employeesCount: employeesCount
    };
    const lastChangesInfo = await this.isNewVersionAvailable(user);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const hseHandbook = await queryRunner.manager.create(HseHandbook, {
        templateVersion: 'v1',
        version: await this.getLastHandbookVersion(user) + 1,
        safetyType: params.safety,
        safetyRepresentativeUuid: params.representativeUserUuid,
        companyUuid: company?.uuid,
        createdByUuid: user.uuid,
        lastRevisedByUuid: lastChangesInfo.lastChangeBy?.uuid || user.uuid,
        lastRevisedAt: lastChangesInfo.lastChangeAt,
        companyInfo: companyInfo,
      });
      await queryRunner.manager.save(hseHandbook);

      // Save Assigned Risks
      for (const risk of risks) {
        const entityToSave = {
          companyUuid: risk.companyUuid,
          responsibleUserUuid: risk.responsibleUserUuid,
          lastRevisedByUuid: risk.lastRevisedByUuid,
          lastRevisedAt: risk.updatedAt,
          assessmentDate: risk.assessmentDate,
          status: risk.status,
          hseRiskCategory: risk.hseRiskCategory.name,
          name: risk.name,
          barriers: risk.barriers,
          probability: risk.probability,
          consequences: risk.consequences,
          assignedHseRiskUuid: risk.uuid,
          hseHandbookUuid: hseHandbook.uuid,
        };
        const riskEntity = await queryRunner.manager.create(HseHandbookAssignedRisk, entityToSave);
        await queryRunner.manager.save(riskEntity);

        for (const translation of risk.translations) {
          const translateEntityToSave = {
            locale: translation.locale,
            name: translation.name,
            barriers: translation.barriers,
            hseRiskCategory: risk.hseRiskCategory.translations.find(catTranslation => catTranslation.locale === translation.locale)?.name,
            hseHandbookAssignedRisk: riskEntity,
          };
          const translateEntity = await queryRunner.manager.create(HseHandbookAssignedRiskTranslation, translateEntityToSave);
          await queryRunner.manager.save(translateEntity);
        }
      }

      // Save Assigned Routines
      for (const routine of routines) {
        const entityToSave = {
          companyUuid: routine.companyUuid,
          projectUuid: routine.projectUuid,
          responsibleUserUuid: routine.responsibleUserUuid,
          lastRevisedByUuid: routine.revisedByPersonUuid,
          lastRevisedAt: routine.updatedAt,
          version: 1,
          hseRoutineCategory: routine.hseRoutineCategory?.name,
          companyHseRoutineCategory: routine.companyHseRoutineCategory?.name,
          name: routine.name,
          content: routine.content,
          assignedHseRoutineUuid: routine.uuid,
          hseHandbookUuid: hseHandbook.uuid,
        };
        // Increment version if routine has been changed since last handbook version
        const routineFromPreviousHandbookVersion = previousHandbook?.routines.find(hseRoutine => hseRoutine.assignedHseRoutineUuid === routine.uuid);
        if (routineFromPreviousHandbookVersion) entityToSave.version = routineFromPreviousHandbookVersion.version;
        if (routineFromPreviousHandbookVersion && routineFromPreviousHandbookVersion.lastRevisedAt < routine.updatedAt) {
          entityToSave.version = routineFromPreviousHandbookVersion.version + 1;
        }
        const routineEntity = await queryRunner.manager.create(HseHandbookAssignedRoutine, entityToSave);
        await queryRunner.manager.save(routineEntity);

        for (const translation of routine.translations) {
          const translateEntityToSave = {
            locale: translation.locale,
            name: translation.name,
            content: translation.content,
            hseRoutineCategory: routine.hseRoutineCategory?.translations.find(catTranslation => catTranslation.locale === translation.locale)?.name,
            companyHseRoutineCategory: routine.companyHseRoutineCategory?.translations.find(catTranslation => catTranslation.locale === translation.locale)?.name,
            hseHandbookAssignedRoutine: routineEntity,
          };
          const translateEntity = await queryRunner.manager.create(HseHandbookAssignedRoutineTranslation, translateEntityToSave);
          await queryRunner.manager.save(translateEntity);
        }
      }

      // Save Org Structure
      const orgStructureEntity = await queryRunner.manager.create(HseHandbookOrgStructure, {
        companyUuid: orgStructure.companyUuid,
        hseHandbookUuid: hseHandbook.uuid,
        lastRevisedByUuid: orgStructure.lastRevisedByUuid,
        lastRevisedAt: orgStructure.updatedAt,
        structure: orgStructure.structure,
      });
      await queryRunner.manager.save(orgStructureEntity);

      await queryRunner.commitTransaction();

      // Send to all active users
      if (params.sendToSign) {
        const users = await this.usersRepository.findBy({ companyUuid: user.company.uuid, statusUuid: 'user.active' });
        await this.hseHandbookSignaturesService.send({
          user: user,
          data: {
            userUuids: users.map(user => user.uuid),
            handbookUuid: hseHandbook.uuid,
          }
        });
      }

      return hseHandbook;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(options: IFindOptions) {
    const [data, count] = await this.hseHandbooksRepository.findAndCount({
      where: { companyUuid: options.user.companyUuid },
      order: { createdAt: 'DESC' },
      ...calcTakeAndSkip(options.pagination)
    });

    return {
      data: data,
      meta: { total: count }
    };
  }

  async findOne(id: string) {
    return this.hseHandbooksRepository.findOneBy({ uuid: id });
  }

  async isNewVersionAvailable(user: User) {
    const changesMadeBy = new Set();
    let lastChangeBy = null;
    let lastChangeAt = new Date();
    let newVersionAvailable = false;
    const lastHandbook = await this.hseHandbooksRepository.findOne({
      where: { companyUuid: user.company.uuid },
      order: { createdAt: 'DESC' },
      relations: ['risks', 'routines']
    });
    const hseHandbookOrgStructure = lastHandbook ? await this.hseHandbookOrgStructuresRepository.findOneBy({
      hseHandbookUuid: lastHandbook.uuid
    }) : null;

    const storeChangesInfo = (changesByUser: User, changesAt: Date) => {
      if (new Date(changesAt) > lastChangeAt) {
        if (changesByUser) lastChangeBy = changesByUser;
        lastChangeAt = new Date(changesAt);
      }

      if (changesByUser?.fullName) changesMadeBy.add(changesByUser.fullName);
    };

    // Comparing risks
    const dbRisks = await this.risksRepository.find({
      where: { companyUuid: user.company.uuid },
      relations: ['lastRevisedBy']
    });
    dbRisks.forEach(dbRisk => {
      const handbookRisk = lastHandbook?.risks.find(handbookRisk => handbookRisk.assignedHseRiskUuid === dbRisk.uuid);
      if (!handbookRisk) return storeChangesInfo(dbRisk.lastRevisedBy, dbRisk.updatedAt);
      if (new Date(dbRisk.updatedAt).valueOf() !== new Date(handbookRisk.lastRevisedAt).valueOf()) {
        storeChangesInfo(dbRisk.lastRevisedBy, dbRisk.updatedAt);
      }
    });
    if (dbRisks.length !== lastHandbook?.risks.length) {
      newVersionAvailable = true;
    }

    // Comparing routines
    const dbRoutines = await this.routinesRepository.find({
      where: { companyUuid: user.company.uuid },
      relations: ['revisedByPerson']
    });
    dbRoutines.forEach(dbRoutine => {
      const handbookRoutine = lastHandbook?.routines.find(handbookRoutine => handbookRoutine.assignedHseRoutineUuid === dbRoutine.uuid);
      if (!handbookRoutine) return storeChangesInfo(dbRoutine.revisedByPerson, dbRoutine.updatedAt);
      if (new Date(dbRoutine.updatedAt).valueOf() !== new Date(handbookRoutine.lastRevisedAt).valueOf()) {
        storeChangesInfo(dbRoutine.revisedByPerson, dbRoutine.updatedAt);
      }
    });
    if (dbRoutines.length !== lastHandbook?.routines.length) {
      newVersionAvailable = true;
    }

    // Comparing org structure
    const dbOrgStructure = await this.orgStructureService.findOne(user.companyUuid, true);
    if (!hseHandbookOrgStructure || (dbOrgStructure?.updatedAt > hseHandbookOrgStructure?.lastRevisedAt)) {
      storeChangesInfo(dbOrgStructure.lastRevisedBy, dbOrgStructure.updatedAt);
    }

    const wasHseCeoChanged = (lastHandbook?.companyInfo as Company)?.hseCeoUserUuid !== user.company.hseCeoUserUuid;
    if (wasHseCeoChanged) {
      storeChangesInfo((lastHandbook?.companyInfo as Company)?.hseCeoUser, user.company.updatedAt);
    }

    return {
      isAvailable: changesMadeBy.size > 0 || newVersionAvailable || wasHseCeoChanged,
      changesMadeBy: Array.from(changesMadeBy),
      lastChangeBy,
      lastChangeAt
    };
  }

  async getPdf(res: Response, printData) {
    const version = 1;
    const language = 'en';
    const template = hbs.compile(readFileSync(join(process.cwd(), `src/templates/v${version}/${language}/hse-handbook.template.html`), 'utf8'));
    const headerTemplate = hbs.compile(readFileSync(join(process.cwd(), `src/templates/v${version}/${language}/hse-handbook-header.template.html`), 'utf8'));

    const tempFilePath = join(process.cwd(), `v${version}-${language}-hse-handbook-header-${uuidv4()}.template.html`);
    writeFileSync(
      tempFilePath,
      headerTemplate(printData)
    );

    const pdfStream = wkhtmltopdf(
      template(printData),
      {
        headerHtml: tempFilePath,
        headerSpacing: 3,
        footerFontSize: 8,
        footerLeft: '[page] / [topage]',
        footerRight: `Print date: ${formatWithTime(new Date())}`,
        marginTop: '30mm',
        marginBottom: '10mm',
      }
    );
    pdfStream.on('end', () => {
      unlink(tempFilePath, (err) => {
        if (err) console.info('Error Unlinking', err);
      });
    });

    res.setHeader('Content-Type', 'application/pdf');
    pdfStream.pipe(res);
  }

  async getLastHandbookVersion(user: User) {
    const previousHandbook = await this.hseHandbooksRepository.findOne({
      where: { companyUuid: user.company.uuid },
      order: { createdAt: 'DESC' },
    });

    return previousHandbook?.version || 0;
  }
}
