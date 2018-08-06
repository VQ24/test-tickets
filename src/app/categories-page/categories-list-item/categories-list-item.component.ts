import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CategoryListItem } from '../../models/category-list';

@Component({
  selector: 'app-categories-list-item',
  templateUrl: './categories-list-item.component.html'
})

export class CategoriesListItemComponent {

  @Input() public listItem: CategoryListItem;

  @Input() public hidden = false;
  @Input() public hideChildren = false;

  @Input() public editMode = false;

  @Input() public checkItemMode = false;
  @Input() public checkedItemId: string;

  @Output() public deleteCategory: EventEmitter<any> = new EventEmitter();
  @Output() public addCategory: EventEmitter<any> = new EventEmitter();
  @Output() public editCategory: EventEmitter<any> = new EventEmitter();
  @Output() public chooseCategory: EventEmitter<any> = new EventEmitter();

  public itemIsChecked(item?: CategoryListItem): boolean {
    return item ? item._id === this.checkedItemId : this.listItem._id === this.checkedItemId;
  }

  public subItemIsChecked(item: CategoryListItem) {
    function isChecked(subitem: CategoryListItem) {
      // return subitem.subCategory.length
      //   ? subitem.subCategory.filter(subCat => this.itemIsChecked(subCat)).length > 0
      //     ? true : subitem.subCategory.filter(subCat => isChecked(subCat)).length > 0
      //   : false;

      if (subitem.subCategory.length > 0) {
        // if (subitem.subCategory.filter(subCat => this.itemIsChecked(subCat))) {
        //   return true;
        // } else {
        //   // return subitem.subCategory.forEach(subCat => isChecked(subCat));
        //   return false;
        // }
      } else {
        return false;
      }
    }
    return isChecked(item);
  }

  public onCheckBoxInput(isChecked: boolean, item: CategoryListItem) {
    if (isChecked) {
      this.onChoose(item);
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

  public onChoose(item: CategoryListItem) {
    this.chooseCategory.emit(item);
  }
}
