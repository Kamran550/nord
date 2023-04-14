import { ApiProperty } from '@nestjs/swagger';
import { StringTranslationApiPropertyOptions, StringTranslationDto } from '../../../types';
import { IsObject } from 'class-validator';

export class CreateHseRiskCategoryDto {
  @ApiProperty(StringTranslationApiPropertyOptions)
  @IsObject()
  name: StringTranslationDto;
}
