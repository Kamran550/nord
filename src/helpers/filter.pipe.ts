import { Injectable, PipeTransform } from '@nestjs/common';


export interface FilterParams {
  [key: string]: {
    condition: string;
    value: any
  }
}


@Injectable()
export class ParseFilterPipe implements PipeTransform<Record<string, string>, FilterParams> {
  transform(value) {
    const filters: Record<string, any> = {};
    Object.keys(value).forEach(key => {
      if (key.startsWith('filter-')) {
        const [condition, objKey] = key.replace('filter-', '').split('-');
        const filterValue = value[key];
        if (filterValue === '') return;

        filters[objKey] = {
          condition: condition,
          value: filterValue.includes(',') ? filterValue.split(',') : filterValue
        };
      }
    });

    return filters;
  }
}
