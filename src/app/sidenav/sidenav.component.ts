import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  styleUrls: ['./sidenav.component.css'],
  templateUrl: './sidenav.component.html'
})

export class SideNavComponent {

  @Input() public checkedItems: string[];
  @Input() public chooseAllCategoriesOnOpen = false;

  @Output() public chooseCategories: EventEmitter<any> = new EventEmitter();
  @Output() public chooseCategoriesAndReload: EventEmitter<any> = new EventEmitter();

  @ViewChild('categoriesList') public categoriesList;

  public isOpened = false;
  public loadRandom = {
    on: false, numberOfTickets: 5
  };

  test() {
    console.log(this.loadRandom);
  }

  public open() {
    if (this.categoriesList.categories) {
      if (this.chooseAllCategoriesOnOpen && !this.checkedItems.length) {
        this.categoriesList.chooseAllCategories();
      }
      this.isOpened = true;
    }
  }

  public close() {
    this.isOpened = false;
  }

  public onChooseCategories(categories: string[]) {
    this.chooseCategories.emit(categories);
  }

  public reloadData(categories: string[]) {
    this.chooseCategoriesAndReload.emit({categories: categories, loadRandom: this.loadRandom});
    this.isOpened = false;
  }

  public get possibleToLoad(): boolean {
    return this.checkedItems.length > 0 && this.loadRandom.numberOfTickets > 0;
  }
}
