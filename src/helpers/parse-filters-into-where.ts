import { In } from 'typeorm';

const parseFiltersIntoWhere = (filters = {}) => {
  const where = {};

  const filterEntries = Object.entries(filters);
  if (!filterEntries.length) return where;

  filterEntries.forEach(([key, value]: [string, { condition: string, value: any }]) => {
    if (!value?.value) return;
    if (value?.condition === 'equals') {
      if (Array.isArray(value?.value)) where[key] = In(value?.value);
      else where[key] = value?.value;
    }
  });

  return where;
};

export default parseFiltersIntoWhere;
