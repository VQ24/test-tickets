import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category-service';
import { Observable } from 'rxjs/Observable';
import { CategoryListItem } from '../models/category-list';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html'
})
export class CategoriesPageComponent implements OnInit {

  public categories$: Observable<CategoryListItem[]>;

  constructor(private service: CategoryService) { }

  ngOnInit() {
    this.categories$ = this.service.categories$;
    this.categories$.subscribe(data => {
      if (!data || !data.length) {
        this.loadData();
      } else {
        console.log(this.mapCategories(data));
      }
    });
  }

  public loadData() {
    this.service.loadAllCategories();
  }

  private mapCategories (categories: any[]): CategoryListItem[] {
    return categories.map(category => {
      return {
        name: category.name,
        _id: category._id,
        subCategory: this.mapCategories(categories.filter(cat => cat.parentCategory === category._id))
      };
    });
  }
}
