import { Inject, Injectable } from '@nestjs/common';
import { SendForSigningDto } from './dto/send-for-signing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Not, Repository } from 'typeorm';
import { HseHandbookSignature, HseHandbookSignatureStatus } from './entities/hse-handbook-signature.entity';
import { IFindOptions } from '../../types';
import { User } from '../users/entities/user.entity';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as hbs from 'hbs';
import parseFiltersIntoWhere from '../../helpers/parse-filters-into-where';
import * as omit from 'lodash/omit';
import { HseHandbook } from '../hse-handbook/entities/hse-handbook.entity';
import applyLanguageFromTranslation from '../../helpers/apply-language-from-translations';
import { RemindForSigningDto } from './dto/remind-for-signing.dto';
import { EmailService } from '../email/email.service';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class HseHandbookSignaturesService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(HseHandbookSignature)
    private hseHandbookSignaturesRepository: Repository<HseHandbookSignature>,
    @InjectRepository(HseHandbook)
    private hseHandbooksRepository: Repository<HseHandbook>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private emailService: EmailService,
    private s3Service: S3Service
  ) { }

  async findAll(options: IFindOptions) {
    const [data, total] = await this.hseHandbookSignaturesRepository.findAndCount({
      where: { companyUuid: options.user.companyUuid },
    });

    return {
      data,
      meta: { total }
    };
  }

  async sign(
    id: string,
    file: Express.Multer.File
  ) {
    try {
      const key = `${file.fieldname}${Date.now()}`;
      const url = await this.s3Service.uploadFile(file, key);
      const dataToUpdate: Partial<HseHandbookSignature> = { signature: url, status: HseHandbookSignatureStatus.Signed };
      const sign_handbook = await this.hseHandbookSignaturesRepository.update({ uuid: id }, dataToUpdate);
    } catch (err) {
      throw err;
    }
  }

  async findAllByUser(options: IFindOptions) {
    const lastHandbook = await this.hseHandbooksRepository.findOne({
      where: { companyUuid: options.user.companyUuid },
      select: ['uuid', 'version'],
      order: { createdAt: 'DESC' },
    });
    let notSent = [];
    let whereQuery: Record<string, any> | Record<string, any>[] = {
      companyUuid: options.user.companyUuid,
      ...parseFiltersIntoWhere(omit(options.filters, ['signingStatus']))
    };

    // Apply Signing Status filters
    const signingStatus = options.filters?.signingStatus;
    if (
      signingStatus && signingStatus?.condition === 'equals' &&
      signingStatus?.value !== 'all' && !signingStatus?.value.includes('all')
    ) {
      const originalWhereQuery = whereQuery;
      whereQuery = [];

      if (signingStatus?.value === 'signed-last-version' || signingStatus?.value.includes('signed-last-version')) {
        whereQuery.push({
          ...originalWhereQuery,
          hseHandbookSignatures: {
            status: HseHandbookSignatureStatus.Signed,
            handbookUuid: lastHandbook?.uuid,
          }
        });
      }
      if (signingStatus?.value === 'signed-old-version' || signingStatus?.value.includes('signed-old-version')) {
        whereQuery.push({
          ...originalWhereQuery,
          hseHandbookSignatures: {
            status: HseHandbookSignatureStatus.Signed,
            handbook: {
              version: Not(lastHandbook.version)
            }
          }
        });
      }
      if (signingStatus?.value === 'sent-version-not-signed' || signingStatus?.value.includes('sent-version-not-signed')) {
        whereQuery.push({
          ...originalWhereQuery,
          hseHandbookSignatures: {
            status: HseHandbookSignatureStatus.Sent,
          }
        });
      }

      if (signingStatus?.value === 'not-sent' || signingStatus?.value.includes('not-sent')) {
        const allUsers = await this.usersRepository.createQueryBuilder('users')
          .where('users.companyUuid = :companyUuid', { companyUuid: options.user.companyUuid })
          .leftJoinAndSelect('users.hseHandbookSignatures', 'hseHandbookSignatures')
          .leftJoinAndSelect('hseHandbookSignatures.handbook', 'handbook')
          .leftJoinAndSelect('users.position', 'position')
          .leftJoinAndSelect('position.translations', 'positionTranslations')
          .leftJoinAndSelect('users.status', 'status')
          .leftJoinAndSelect('status.translations', 'statusTranslations')
          .leftJoinAndSelect('users.role', 'role')
          .leftJoinAndSelect('role.translations', 'roleTranslations')
          .loadRelationCountAndMap('users.hseHandbookSignatures', 'users.hseHandbookSignatures')
          .getMany();
        notSent = allUsers.filter((el: any) => el.hseHandbookSignatures === 0);
      }

      if (!whereQuery.length) whereQuery = originalWhereQuery;
    }

    const [data, total] = await this.usersRepository.findAndCount({
      where: whereQuery,
      relations: [
        'hseHandbookSignatures', 'hseHandbookSignatures.handbook', 'position', 'status', 'status.translations',
        'position', 'position.translations', 'role', 'role.translations'
      ],
      order: {
        fullName: 'ASC',
        hseHandbookSignatures: { createdAt: 'DESC' }
      },
    });
    const startIndex = (options.pagination.page - 1) * options.pagination.pageSize;

    const result = [...data];
    notSent.forEach(notSentUser => {
      if (!result.find(el => el.uuid === notSentUser.uuid)) result.push(notSentUser);
    });

    return {
      data: data
        .sort((a, b) => a.fullName > b.fullName ? 1 : -1)
        .slice(startIndex, startIndex + options.pagination.pageSize)
        .map(user => {
          let lastSignedInfo = null;
          let lastSentInfo = null;
          if (user?.hseHandbookSignatures) {
            lastSignedInfo = user?.hseHandbookSignatures?.find(signature => signature.status === HseHandbookSignatureStatus.Signed);
            lastSentInfo = user?.hseHandbookSignatures?.find(signature => signature.status === HseHandbookSignatureStatus.Sent);
          }

          return applyLanguageFromTranslation({
            ...user,
            lastSignedInfo,
            lastSentInfo,
            hseHandbookSignatures: user?.hseHandbookSignatures?.length
          }, options.lang);
        }),
      meta: { total: total + notSent.length }
    };
  }

  findOne(id: string) {
    return this.hseHandbookSignaturesRepository.findOneBy({ uuid: id });
  }

  async send({ user, data }: { user: User, data: SendForSigningDto }) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = [];

      for (const userUuid of data.userUuids) {
        const exists = await this.hseHandbookSignaturesRepository.findOneBy({
          userUuid, handbookUuid: data.handbookUuid
        });
        if (exists) continue;

        const entity = queryRunner.manager.create(HseHandbookSignature, {
          userUuid: userUuid,
          handbookUuid: data.handbookUuid,
          companyUuid: user.companyUuid
        });
        await queryRunner.manager.save(entity);

        result.push(entity);
      }

      await queryRunner.commitTransaction();

      // Send emails
      const emails = [];
      for (const entity of result) {
        const user = await this.usersRepository.findOne({
          select: ['email', 'uuid'],
          where: { uuid: entity.userUuid }
        });
        emails.push(user.email);
      }

      const handbook = await this.hseHandbooksRepository.findOneBy({ uuid: data.handbookUuid });
      const template = hbs.compile(readFileSync(join(process.cwd(), 'src/templates/emails/invite-to-sign-hse-handbook.template.html'), 'utf8'));

      for (let i = 0; i < emails.length; i++) {
        await this.emailService.send({
          from: 'noreply@nsystem.no',
          to: [emails[i], 't.danyliuk@relevant.software'],
          html: template({
            company_name: user.company.name,
            company_name_root: user.company.slug,
            handbook_version: handbook.version,
            signature_uuid: result[i].uuid
          }),
          subject: `Please read & sign ${user.company.name} HSE handbook`,
        });
      }

      return {
        status: 'ok',
        count: emails.length
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async remind({ user, data }: { user: User, data: RemindForSigningDto }) {
    const entities = await this.hseHandbookSignaturesRepository.find({
      where: {
        companyUuid: user.companyUuid,
        status: HseHandbookSignatureStatus.Sent,
        userUuid: In(data.userUuids)
      },
      relations: ['user', 'handbook']
    });

    const grouped: Record<string, any> = {};
    entities.forEach(entity => {
      if (!grouped[entity.handbook.version]) grouped[entity.handbook.version] = [];
      grouped[entity.handbook.version].push(entity.user.email);
    });

    const versions = Object.keys(grouped);
    for (const version of versions) {
      const template = hbs.compile(readFileSync(join(process.cwd(), 'src/templates/emails/invite-to-sign-hse-handbook.template.html'), 'utf8'));
      await this.emailService.send({
        from: 'noreply@nsystem.no',
        to: [...grouped[version], 't.danyliuk@relevant.software'],
        html: template({
          company_name: user.company.name,
          handbook_version: version
        }),
        subject: `Please read & sign ${user.company.name} HSE handbook`,
      });
    }

    return {
      status: 'ok',
      count: entities.length
    };
  }
}
