import { PartialType } from '@nestjs/swagger';
import { CreateCompanyHseRoutineCategoryDto } from './create-company-hse-routine-category.dto';

export class UpdateCompanyHseRoutineCategoryDto extends PartialType(CreateCompanyHseRoutineCategoryDto) {}
