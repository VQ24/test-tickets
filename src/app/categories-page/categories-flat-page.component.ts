import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../service/category-service';
import { CategoryListItem } from '../models/category-list';

@Component({
  selector: 'app-categories-flat-page',
  templateUrl: './categories-flat-page.component.html'
})
export class CategoriesFlatPageComponent implements OnInit {

  @Input() public currentTicketCategory: string;

  public categories: any[];

  constructor(private service: CategoryService) { }

  ngOnInit() {
    this.service.categories$.subscribe(data => {
      if (!data || !data.length) {
        this.loadData();
      } else {
        this.categories = this.mapCategories(data);
      }
    });
  }

  public loadData() {
    this.service.loadAllCategories();
  }

  private mapCategories (categories: any[]): any[] {
    const resultArr = [];
    let parentId = this.currentTicketCategory;
    do {
      const matchedCategory = categories.filter(cat => cat._id === parentId)[0];
      if (matchedCategory) {resultArr.push(matchedCategory); }
      parentId = matchedCategory ? matchedCategory.parentCategory : null;
    } while (parentId);
    return resultArr.length > 0 ? resultArr.reverse() : [{name: 'Category is not defined'}];
  }
}
