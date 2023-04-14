import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';
import { PaginationParams } from '../helpers/pagination.pipe';
import { FilterParams } from '../helpers/filter.pipe';

// Pagination Response
export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(model) }
          },
          meta: {
            type: 'object',
            properties: {
              total: {
                type: 'number'
              }
            }
          }
        }
      }
    })
  );
};

export class DeleteResponseDto {
  @ApiProperty()
  success: boolean;
}


// String translates
export const StringTranslationApiPropertyOptions = {
  type: 'object',
  properties: {
    lt: {
      type: 'string'
    }
  },
  additionalProperties: {
    type: 'string'
  }
};

export class StringTranslationDto {
  [key: string]: string
}

export const ObjectTranslationApiPropertyOptions = {
  type: 'array',
  items: {
    type: 'object',
    additionalProperties: StringTranslationApiPropertyOptions
  }
};

export class ObjectTranslationDto {
  [key: string]: StringTranslationDto
}


// Get request options
export interface IFindOptions {
  lang: string
  pagination?: PaginationParams,
  search?: string,
  user?: {
    uuid: string,
    companyUuid?: string
  }
  filters?: FilterParams
}

export interface ILangOptions {
  lang: string
  user?: {
    uuid: string,
    companyUuid?: string
  }
  hasTranslations?: boolean
}
