import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';


export class AssignHseRoutineDto {
  @ApiProperty()
  @IsUUID()
  companyUuid: string;

  @ApiProperty()
  @IsUUID()
  responsibleUserUuid: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  projectUuid: string;

  @ApiProperty()
  @IsUUID('all', { each: true })
  templateUuids: string[];
}
