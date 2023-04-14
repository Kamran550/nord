import { Injectable } from '@nestjs/common';
import { CreateOrgStructureDto } from './dto/create-org-structure.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrgStructure } from './entities/org-structure.entity';
import { User } from '../users/entities/user.entity';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as hbs from 'hbs';
import { Response } from 'express';
import * as wkhtmltopdf from 'wkhtmltopdf';
import { HseHandbookOrgStructure } from '../hse-handbook/entities/hse-handbook-org-structure.entity';


wkhtmltopdf.command = process.env.WKHTMLTOPDF_PATH;
wkhtmltopdf.shell = process.env.WKHTMLTOPDF_SH || wkhtmltopdf.shell;


@Injectable()
export class OrgStructuresService {
  constructor(
    @InjectRepository(OrgStructure)
    private orgStructuresRepository: Repository<OrgStructure>
  ) {}

  async save(createOrgStructureDto: CreateOrgStructureDto, user: User) {
    const target = await this.orgStructuresRepository.findOneBy({ companyUuid: user.companyUuid });
    if (target) {
      await this.orgStructuresRepository.update(target.uuid, {
        ...createOrgStructureDto,
        lastRevisedByUuid: user.uuid
      });
    }
    else {
      await this.orgStructuresRepository.insert({
        ...createOrgStructureDto,
        lastRevisedByUuid: user.uuid,
        companyUuid: user.companyUuid
      });
    }

    return this.orgStructuresRepository.findOneBy({ companyUuid: user.companyUuid });
  }

  findOne(companyUuid: string, withRelations = false) {
    return this.orgStructuresRepository.findOne({
      where: { companyUuid },
      relations: withRelations ? ['lastRevisedBy'] : []
    });
  }

  getOrgStructureHtml(orgStructure: OrgStructure | HseHandbookOrgStructure, lang: string, version: string | number = '1') {
    const nodeTemplate = hbs.compile(readFileSync(join(process.cwd(), `src/templates/v${version}/org-structure/node.template.html`), 'utf8'));
    hbs.registerPartial('node', nodeTemplate);
    const template = hbs.compile(readFileSync(join(process.cwd(), `src/templates/v${version}/org-structure/org-structure.template.html`), 'utf8'));

    const applyLang = (obj) => {
      const result: Record<string, any> = { data: {} };

      const { data, children } = obj;
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'persons') result.data[key] = (value as []).map((person: any) => person.name).join(', ');
        else if (typeof value === 'object') result.data[key] = value[lang];
        else result.data[key] = value;
      });

      if (children) result.children = children.map(applyLang);

      return result;
    };
    const structure = applyLang(orgStructure?.structure || {});

    return template({ ...structure });
  }

  async getPdf(res: Response, companyUuid: string, lang: string) {
    const orgStructure = await this.orgStructuresRepository.findOneBy({ companyUuid });
    const version = '1';

    const pdfStream = wkhtmltopdf(this.getOrgStructureHtml(orgStructure, lang, version));
    res.setHeader('Content-Type', 'application/pdf');
    pdfStream.pipe(res);
  }
}
