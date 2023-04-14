import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class RemindForSigningDto {
  @ApiProperty()
  @IsArray()
  userUuids: string[];
}
