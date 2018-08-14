import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CategoryListItem } from '../../models/category-list';

@Component({
  selector: 'app-categories-list-item',
  styleUrls: ['../categories-page.css'],
  templateUrl: './categories-list-item.component.html'
})

export class CategoriesListItemComponent {

  @Input() public listItem: CategoryListItem;

  @Input() public hidden = false;
  @Input() public hideChildren = false;

  @Input() public editMode = false;

  @Input() public checkItemMode = false;
  @Input() public checkedItemId: string;
  @Input() public multiCheck = false;
  @Input() public checkedItems: string[] = [];

  @Output() public deleteCategory: EventEmitter<any> = new EventEmitter();
  @Output() public addCategory: EventEmitter<any> = new EventEmitter();
  @Output() public editCategory: EventEmitter<any> = new EventEmitter();
  @Output() public chooseCategory: EventEmitter<any> = new EventEmitter();
  @Output() public unChooseCategory: EventEmitter<any> = new EventEmitter();

  public itemIsChecked(): boolean {
    return this.multiCheck ?
      this.checkedItems.filter(item => item === this.listItem._id).length > 0 :
      this.listItem._id === this.checkedItemId;
  }

  private itemChecked(item: CategoryListItem, id: string): boolean {
    return item._id === id;
  }

  public subItemIsChecked(item: CategoryListItem) {
    if (!this.multiCheck) {
      const subChecked = subitem => subitem.subCategory.filter(sc =>
        this.itemChecked(sc, this.checkedItemId) ? true : subChecked(sc)
      ).length > 0;
      return item.subCategory.length ? subChecked(item) : false;
    } else {
      let checkedResult = false;
      this.checkedItems.forEach(checkedListItem => {
        const subCheckedMulti = subitem => subitem.subCategory.forEach(sc => {
          if (this.itemChecked(sc, checkedListItem)) {
            checkedResult = true;
          }
          if (sc.subCategory.length) {
            subCheckedMulti(sc);
          }
        });
        subCheckedMulti(item);
      });
      return this.itemIsChecked() ? false : checkedResult;
    }
  }

  public onCheckBoxInput(isChecked: boolean, item: CategoryListItem | string) {
    if (isChecked) {
      if (this.multiCheck) {
        const input = item as CategoryListItem;
        this.onChoose(input._id);
      } else {
        this.onChoose(item);
      }
    } else {
      if (this.multiCheck) {
        const input = item as CategoryListItem;
        this.onUnChoose(input._id);
      } else {
        this.onChoose({_id: null} as any);
      }
    }
  }

  public onDelete(item: CategoryListItem) {
    this.deleteCategory.emit(item);
  }

  public onAdd(item: CategoryListItem) {
    this.addCategory.emit(item);
  }

  public onEdit(item: CategoryListItem) {
    this.editCategory.emit(item);
  }

  public onChoose(item: CategoryListItem | string) {
    this.chooseCategory.emit(item);
  }

  public onUnChoose(item: CategoryListItem | string) {
    this.unChooseCategory.emit(item);
  }
}
