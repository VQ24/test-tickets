import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CategoryService } from '../service/category-service';
import { CategoryListItem } from '../models/category-list';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories-page',
  styleUrls: ['./categories-page.css'],
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
  @ViewChild('modalAddCategory') public addCategoryWindow;
  @ViewChild('modalDeleteCategory') public deleteCategoryWindow;

  public categories: CategoryListItem[];

  constructor(private service: CategoryService) { }

  ngOnInit() {
    this.service.categories$.subscribe((data: Category[]) => {
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
    this.deleteCategoryWindow.open(item, 'delete category');
  }

  public onAddCategory(item: CategoryListItem) {
    this.addCategoryWindow.open(item, 'create');
  }

  public onEditCategory(item: CategoryListItem) {
    this.editCategoryWindow.open(item, 'name edit');
  }

  public onUpdateCategory(item: CategoryListItem) {
    let matchingCategory;
    this.service.getCategory(item._id).subscribe(data => matchingCategory = data);
    const resultItem = Object.assign(matchingCategory, {name: item.name});
    this.service.updateCategory(resultItem);
  }

  public onAddNewCategory(item) {
    this.service.createCategory(item);
  }

  public onDeleteCategoryWithSubcategories(item: CategoryListItem) {
    let parentCategory;
    this.service.categories$.subscribe(data => {
      if (!data || !data.length) {
        this.loadData();
      } else {
        const filteredData = data.filter((origCat: any) => origCat.subCategory === item._id);
        parentCategory = filteredData.length ? filteredData[0] : null;
      }
    });
    const resultCategories = this.unMapCategories(item, parentCategory).map(cat => cat._id);
    this.service.deleteCategories(resultCategories);
  }

  public chooseAllCategories() {
    if (this.multiCheck) {
      const result = this.unMapCategories({_id: null, name: null, subCategory: this.categories}, null)
        .filter(item => item._id)
        .map(item => item._id);
        this.checkedItems = result;
        this.chooseCategory.emit(this.checkedItems);
    }
  }

  public unchooseAllCategories() {
    if (this.multiCheck) {
      this.checkedItems = [];
      this.chooseCategory.emit(this.checkedItems);
    }
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

  private mapCategories (categories: Category[]): CategoryListItem[] {
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

  private unMapCategories (category: CategoryListItem, parentId: string): Category[] {
    const resultArr = [];
    resultArr.push({_id: category._id, name: category.name, parentCategory: parentId});
    const goInsideArray = (arrCategories: CategoryListItem[], parentItem: CategoryListItem) => {
      arrCategories.forEach(subcat => {
        resultArr.push({_id: subcat._id, name: subcat.name, parentCategory: parentItem._id});
        goInsideArray(subcat.subCategory, subcat);
      });
    };
    goInsideArray(category.subCategory, category);
    return resultArr;
  }
}
