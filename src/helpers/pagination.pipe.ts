import { Injectable, PipeTransform } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';


@Injectable()
export class ParsePaginationPipe implements PipeTransform<Record<string, string>, { page: number, pageSize: number }> {
  transform(value) {
    const page = Number(value['page']) || 1;
    const pageSize = Number(value['per_page']) || 20;

    return { page, pageSize };
  }
}

export class PaginationParams {
  @ApiProperty({
    name: 'page',
    required: false
  })
  @IsNumberString()
  @IsOptional()
  page?: number;

  @ApiProperty({
    name: 'per_page',
    required: false
  })
  @IsNumberString()
  @IsOptional()
  pageSize?: number;
}
