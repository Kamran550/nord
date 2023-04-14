import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional, IsUUID } from 'class-validator';
import { StringTranslationApiPropertyOptions, StringTranslationDto } from '../../../types';


export class CreateAssignedHseRoutineDto {
  @ApiProperty()
  @IsUUID()
  companyUuid: string;

  @ApiProperty()
  @IsUUID()
  responsibleUserUuid: string;

  @ApiProperty()
  @IsUUID()
  revisedByPersonUuid:string;
  

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  projectUuid: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  hseRoutineCategoryUuid: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  companyHseRoutineCategoryUuid: string;

  @ApiProperty(StringTranslationApiPropertyOptions)
  @IsObject()
  name: StringTranslationDto;

  @ApiProperty(StringTranslationApiPropertyOptions)
  @IsObject()
  content: StringTranslationDto;
}
