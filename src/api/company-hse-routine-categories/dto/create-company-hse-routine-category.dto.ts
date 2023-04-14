import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsUUID } from 'class-validator';
import { StringTranslationApiPropertyOptions, StringTranslationDto } from '../../../types';


export class CreateCompanyHseRoutineCategoryDto {
  @ApiProperty(StringTranslationApiPropertyOptions)
  @IsObject()
  name: StringTranslationDto;

  @ApiProperty({ required: true })
  @IsUUID()
  companyUuid: string;
}
