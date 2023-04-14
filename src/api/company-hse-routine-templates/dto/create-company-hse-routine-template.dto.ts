import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsObject, IsOptional, IsUUID } from 'class-validator';
import { StringTranslationApiPropertyOptions, StringTranslationDto } from '../../../types';


export class CreateCompanyHseRoutineTemplateDto {
  @ApiProperty()
  @IsUUID()
  companyUuid: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  hseRoutineCategoryUuid: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  companyHseRoutineCategoryUuid: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  hseRoutineTemplateUuid: string;

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
