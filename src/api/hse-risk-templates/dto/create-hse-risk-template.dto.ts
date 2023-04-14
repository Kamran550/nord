import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsObject, IsUUID } from 'class-validator';
import {
  ObjectTranslationApiPropertyOptions, ObjectTranslationDto,
  StringTranslationApiPropertyOptions,
  StringTranslationDto
} from '../../../types';


export class CreateHseRiskTemplateDto {
  @ApiProperty()
  @IsUUID()
  hseRiskCategoryUuid: string;

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
