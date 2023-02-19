import RequestPagination from '../entities/helpers/request.pagination';

export const requestPaginatorGenerator = (page: number, pageSize: number) => {

  const validPage = !page || isNaN(page)  ? 1 : page;
  const validPageSize = !pageSize || isNaN(pageSize)  ? 10 : pageSize;

  let pageNumber = Math.floor(validPage);
  pageNumber = pageNumber <= 1 ? 1 : pageNumber;

  let pageSizeNumber = Math.floor(validPageSize);
  pageSizeNumber = pageSizeNumber <= 1 ? 1 : pageSizeNumber;

  return {
    skip : (pageNumber-1)*pageSizeNumber,
    limit: pageSizeNumber,
    page: pageNumber,
    pageSize: pageSizeNumber
  }
}

export const responsePaginationGenerator = (requestPagination: RequestPagination, pageElements: number, totalElements: number) => {

  const { page, pageSize} = requestPagination;

  const totalPages = Math.ceil(totalElements / pageSize);

  let next = undefined;
  if (page < totalPages && page > 0) next = page + 1;
  if (page === totalPages) next = undefined;

  let previous = undefined;
  previous = page > 1 ? page - 1 : undefined;

  return {
    next,
    previous,
    pageElements,
    totalElements,
    totalPages
  }
}