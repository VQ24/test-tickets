import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FilterSettings } from '../models/settings';

@Component({
  selector: 'app-side-nav',
  styleUrls: ['./sidenav.component.css'],
  templateUrl: './sidenav.component.html'
})

export class SideNavComponent {

  @Output() public chooseCategories: EventEmitter<any> = new EventEmitter();
  @Output() public chooseCategoriesAndReload: EventEmitter<any> = new EventEmitter();

  @Input() public checkedItems: string[];
  @Input() public settings: FilterSettings;

  @ViewChild('categoriesList') public categoriesList;

  public isOpened = false;

  public open() {
    if (this.settings) {
      if (this.categoriesList.categories) {
        if (this.settings.categoriesSection.loadAllOnOpenIfListIsEmpty && !this.checkedItems.length) {
          this.categoriesList.chooseAllCategories();
        }
        this.isOpened = true;
      }
    }
  }

  public close() {
    this.isOpened = false;
  }

  public onChooseCategories(categories: string[]) {
    this.chooseCategories.emit(categories);
  }

  public reloadData(categories: string[], tags: string[]) {
    this.chooseCategoriesAndReload.emit({
      categories: categories,
      loadRandom: this.settings.randomSection.loadRandom,
      tags: tags,
      settings: this.settings,
    });
    this.isOpened = false;
  }

  public get possibleToLoad(): boolean {
    return this.settings.randomSection.loadRandom.on ?
      this.settings.randomSection.loadRandom.on && this.settings.randomSection.loadRandom.numberOfTickets > 0 : true;
  }
}
