import { PartialType } from '@nestjs/swagger';
import { CreateCompanyHseRiskTemplateDto } from './create-company-hse-risk-template.dto';

export class UpdateCompanyHseRiskTemplateDto extends PartialType(CreateCompanyHseRiskTemplateDto) {}
