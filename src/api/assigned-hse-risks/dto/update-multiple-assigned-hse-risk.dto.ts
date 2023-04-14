import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAssignedHseRiskDto } from './create-assigned-hse-risk.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateMultipleAssignedHseRiskDto extends PartialType(CreateAssignedHseRiskDto) {
  @ApiProperty()
  @IsArray()
  uuids: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  barrierDeadline: string;
}
