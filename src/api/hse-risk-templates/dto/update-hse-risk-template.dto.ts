import { PartialType } from '@nestjs/swagger';
import { CreateHseRiskTemplateDto } from './create-hse-risk-template.dto';

export class UpdateHseRiskTemplateDto extends PartialType(CreateHseRiskTemplateDto) {}
