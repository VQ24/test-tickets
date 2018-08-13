import { Component, Input } from '@angular/core';
import { Pagination, PaginationPage } from '../models/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})

export class PaginationComponent {

  @Input() public paginationInfo: Pagination = {
    offset: 10,
    limit: 5,
    total: 52,
  };

  constructor() {}

  public test(val) {
    console.log(val);
  }

  public isCurrentPage(page: PaginationPage): boolean {
    return page.pageOffset === this.paginationInfo.offset;
  }

  public isFirstPage(page: PaginationPage): boolean {
    return this.paginationInfo.offset === 0;
  }


  public get pages(): PaginationPage[] {
    const result = [];
    for (let i = 0; i < Math.ceil(this.paginationInfo.total / this.paginationInfo.limit); i++) {
      result.push({pageNum: i, pageOffset: i * this.paginationInfo.limit});
    }
    return result;
  }
}
