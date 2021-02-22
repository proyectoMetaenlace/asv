export class PaginationModel {
    selectItemsPerPage: number[] = [2, 5, 10, 25, 50, 100];
    pageSize = 2;
    pageIndex = 1;
    allItemsLength = 0;
}
