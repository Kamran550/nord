import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsObject, IsOptional, IsUUID } from 'class-validator';
import {
  ObjectTranslationApiPropertyOptions, ObjectTranslationDto,
  StringTranslationApiPropertyOptions,
  StringTranslationDto
} from '../../../types';


export class CreateCompanyHseRiskTemplateDto {
  @ApiProperty()
  @IsUUID()
  companyUuid: string;

  @ApiProperty()
  @IsUUID()
  hseRiskCategoryUuid: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  hseRiskTemplateUuid: string;

  @ApiProperty()
  @IsBoolean()
  isVisible: boolean;

  @ApiProperty(StringTranslationApiPropertyOptions)
  @IsObject()
  name: StringTranslationDto;

  @ApiProperty(ObjectTranslationApiPropertyOptions)
  @IsArray()
  barriers: ObjectTranslationDto[];
}
