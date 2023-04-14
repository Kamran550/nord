import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';
import {
  ObjectTranslationApiPropertyOptions, ObjectTranslationDto,
  StringTranslationApiPropertyOptions,
  StringTranslationDto
} from '../../../types';

export class CreateAssignedHseRiskDto {
  @ApiProperty()
  @IsUUID()
  companyUuid: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  hseRiskCategoryUuid: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  hseRiskTemplateUuid: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  companyHseRiskTemplateUuid: string;

  @ApiProperty()
  @IsUUID()
  responsibleUserUuid: string;

  @ApiProperty(StringTranslationApiPropertyOptions)
  @IsObject()
  name: StringTranslationDto;

  @ApiProperty(ObjectTranslationApiPropertyOptions)
  @IsArray()
  barriers: ObjectTranslationDto[];

  @ApiProperty()
  @IsString()
  assessmentDate: Date;

  @ApiProperty()
  @IsNumber()
  probability: number;

  @ApiProperty()
  @IsNumber()
  consequences: number;

  @ApiProperty()
  @IsNumber()
  status: number;
}
