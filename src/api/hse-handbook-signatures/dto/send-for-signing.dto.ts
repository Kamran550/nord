import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

export class SendForSigningDto {
  @ApiProperty()
  @IsArray()
  userUuids: string[];

  @ApiProperty()
  @IsUUID()
  handbookUuid: string;
}
