import { PartialType } from '@nestjs/swagger';
import { CreateHseRiskCategoryDto } from './create-hse-risk-category.dto';

export class UpdateHseRiskCategoryDto extends PartialType(CreateHseRiskCategoryDto) {}
