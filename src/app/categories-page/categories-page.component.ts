import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../service/category-service';
import { CategoryListItem } from '../models/category-list';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html'
})
export class CategoriesPageComponent implements OnInit {

  @Input() public hidden = false;
  @Input() public hideChildren = false;

  @Input() public editMode = false;

  @Input() public checkItemMode = false;
  @Input() public checkedItemId: string;

  @Output() public chooseCategory: EventEmitter<any> = new EventEmitter();

  public categories: CategoryListItem[];

  constructor(private service: CategoryService) { }

  ngOnInit() {
    this.service.categories$.subscribe(data => {
      if (!data || !data.length) {
        this.loadData();
      } else {
        this.categories = this.mapCategories(data);
        // console.log(this.categories);
      }
    });
  }

  public loadData() {
    this.service.loadAllCategories();
  }

  public onDeleteCategory(item: CategoryListItem) {
    console.log('Delete: ', item);
  }

  public onAddCategory(item: CategoryListItem) {
    console.log('Add: ', item);
  }

  public onEditCategory(item: CategoryListItem) {
    console.log('Edit: ', item);
  }

  public onChooseCategory(item: CategoryListItem) {
    this.checkedItemId = item._id;
    this.chooseCategory.emit(item._id);
    console.log('Checked: ', item);
  }

  private mapCategories (categories: any[]): CategoryListItem[] {
    const rearrange = (arrCategories: any[]) => {
      return arrCategories.map(arrCategory => {
        return {
          name: arrCategory.name,
          _id: arrCategory._id,
          subCategory: rearrange(categories.filter(cat => cat.parentCategory === arrCategory._id))
        };
      });
    };
    return rearrange(categories.filter(item => !item.parentCategory));
  }
}
