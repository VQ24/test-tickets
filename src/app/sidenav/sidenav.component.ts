import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  styleUrls: ['./sidenav.component.css'],
  templateUrl: './sidenav.component.html'
})

export class SideNavComponent {

  @Input() public checkedItems: string[];

  @Output() public chooseCategories: EventEmitter<any> = new EventEmitter();
  @Output() public chooseCategoriesAndReload: EventEmitter<any> = new EventEmitter();

  public isOpened = false;

  public open() {
    this.isOpened = true;
  }

  public close() {
    this.isOpened = false;
  }

  public onChooseCategories(categories: string[]) {
    this.chooseCategories.emit(categories);
  }

  public reloadData(categories: string[]) {
    this.chooseCategoriesAndReload.emit(categories);
    this.isOpened = false;
  }
}
