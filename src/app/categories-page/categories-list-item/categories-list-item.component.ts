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

  public itemIsChecked(): boolean {
    return this.listItem._id === this.checkedItemId;
  }

  private itemChecked(item: CategoryListItem): boolean {
    return item._id === this.checkedItemId;
  }

  public subItemIsChecked(item: CategoryListItem) {
    const subChecked = subitem => subitem.subCategory.filter(sc =>
      this.itemChecked(sc) ? true : subChecked(sc)
    ).length > 0;
    return item.subCategory.length ? subChecked(item) : false;
  }

  public onCheckBoxInput(isChecked: boolean, item: CategoryListItem) {
    if (isChecked) {
      this.onChoose(item);
    } else {
      this.onChoose({_id: null} as any);
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