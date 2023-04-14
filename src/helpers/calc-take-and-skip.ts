import { PaginationParams } from './pagination.pipe';

const calcTakeAndSkip = (pagination?: PaginationParams) => {
  if (!pagination) return {};

  return {
    take: pagination.pageSize,
    skip: (pagination.page - 1) * pagination.pageSize
  };
};

export default calcTakeAndSkip;
