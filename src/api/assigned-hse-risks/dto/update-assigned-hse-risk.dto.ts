import { PartialType } from '@nestjs/swagger';
import { CreateAssignedHseRiskDto } from './create-assigned-hse-risk.dto';

export class UpdateAssignedHseRiskDto extends PartialType(CreateAssignedHseRiskDto) {}
