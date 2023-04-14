import { PartialType } from '@nestjs/swagger';
import { CreateHseRoutineCategoryDto } from './create-hse-routine-category.dto';

export class UpdateHseRoutineCategoryDto extends PartialType(CreateHseRoutineCategoryDto) {}
