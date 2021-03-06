import { Component, Input } from '@angular/core';
import { Pagination, PaginationPage } from '../models/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})

export class PaginationComponent {

  @Input() public paginationInfo: Pagination = {
    offset: 15,
    limit: 5,
    total: 52,
  };

  public updatePagination(page: PaginationPage) {
    this.paginationInfo.offset = page.pageOffset;
  }

  public increasePagination() {
    if (!this.isLastPage) {
      this.paginationInfo.offset += this.paginationInfo.limit;
    }
  }

  public decreasePagination() {
    if (!this.isFirstPage) {
      this.paginationInfo.offset -= this.paginationInfo.limit;
    }
  }

  public isCurrentPage(page: PaginationPage): boolean {
    return page.pageOffset === this.paginationInfo.offset;
  }

  public get isFirstPage(): boolean {
    return this.paginationInfo.offset === 0;
  }

  public get isLastPage(): boolean {
    return this.paginationInfo.limit >= Math.abs(this.paginationInfo.offset - this.paginationInfo.total);
  }

  public get isOnlyPage(): boolean {
    return this.isFirstPage && this.isLastPage;
  }

  public get pages(): PaginationPage[] {
    const result = [];
    for (let i = 0; i < Math.ceil(this.paginationInfo.total / this.paginationInfo.limit); i++) {
      result.push({pageNum: i, pageOffset: i * this.paginationInfo.limit});
    }
    return result;
  }
}
