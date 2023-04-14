import { PartialType } from '@nestjs/swagger';
import { CreateHseRoutineTemplateDto } from './create-hse-routine-template.dto';

export class UpdateHseRoutineTemplateDto extends PartialType(CreateHseRoutineTemplateDto) {}
