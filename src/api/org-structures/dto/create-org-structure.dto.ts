import { IsObject } from 'class-validator';

export class CreateOrgStructureDto {
  @IsObject()
  structure: object;
}
