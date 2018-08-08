import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
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
  @Input() public multiCheck = false;
  @Input() public checkedItems: string[] = [];

  @Output() public chooseCategory: EventEmitter<any> = new EventEmitter();

  @ViewChild('modalEditCategory') public editCategoryWindow;

  public categories: CategoryListItem[];

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

  public onDeleteCategory(item: CategoryListItem) {
    console.log('Delete: ', item);
  }

  public onAddCategory(item: CategoryListItem) {
    console.log('Add: ', item);
  }

  public onEditCategory(item: CategoryListItem) {
    this.editCategoryWindow.open(item, 'category name edit');
  }

  public onUpdateCategory(item: CategoryListItem) {
    let matchingCategory;
    this.service.getCategory(item._id).subscribe(data => matchingCategory = data);
    const resultItem = Object.assign(matchingCategory, {name: item.name});
    this.service.updateCategory(resultItem);
  }

  public onChooseCategory(item: CategoryListItem | string) {
    if (this.multiCheck) {
      const input = item as string;
      this.checkedItems.push(input);
      this.chooseCategory.emit(this.checkedItems);
    } else {
      const input = item as CategoryListItem;
      this.checkedItemId = input._id;
      this.chooseCategory.emit(input._id);
    }
  }

  public onUnChooseCategory(item: string) {
    if (this.multiCheck) {
      this.checkedItems = this.checkedItems.filter(it => it !== item);
      this.chooseCategory.emit(this.checkedItems);
    }
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
