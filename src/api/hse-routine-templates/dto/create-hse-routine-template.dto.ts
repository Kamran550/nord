import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsObject, IsUUID } from 'class-validator';
import { StringTranslationApiPropertyOptions, StringTranslationDto } from '../../../types';

export class CreateHseRoutineTemplateDto {
  @ApiProperty()
  @IsUUID()
  hseRoutineCategoryUuid: string;

  @ApiProperty()
  @IsBoolean()
  isVisible: boolean;

  @ApiProperty(StringTranslationApiPropertyOptions)
  @IsObject()
  name: StringTranslationDto;

  @ApiProperty(StringTranslationApiPropertyOptions)
  @IsObject()
  content: StringTranslationDto;
}
