import { PartialType } from '@nestjs/swagger';
import { CreateCompanyHseRoutineTemplateDto } from './create-company-hse-routine-template.dto';

export class UpdateCompanyHseRoutineTemplateDto extends PartialType(CreateCompanyHseRoutineTemplateDto) {}
