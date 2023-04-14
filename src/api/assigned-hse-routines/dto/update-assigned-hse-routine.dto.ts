import { PartialType } from '@nestjs/swagger';
import { CreateAssignedHseRoutineDto } from './create-assigned-hse-routine.dto';

export class UpdateAssignedHseRoutineDto extends PartialType(CreateAssignedHseRoutineDto) {}
