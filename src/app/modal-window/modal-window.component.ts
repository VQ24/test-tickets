import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html'
})

export class ModalWindowComponent {

  @Input() public header = '';

  @Output() public okAction: EventEmitter<any> = new EventEmitter();

  public item: any;
  public hidden = true;
  public confirmMode = false;

  private itemObject: any;
  private options: string;

  public open (item: any, options: string) {
    this.itemObject = item;
    this.options = options;
    switch (options) {
      case 'name edit': {
        this.item = item.name;
        this.hidden = false;
        break;
      }
      case 'create': {
        this.item = '';
        this.hidden = false;
        break;
      }
      case 'delete': {
        this.item = item.name;
        this.confirmMode = true;
        this.hidden = false;
        break;
      }
      default: break;
    }
  }

  public close () {
    this.hidden = true;
  }

  public saveAndClose() {
    switch (this.options) {
      case 'name edit': {
        const resultItem = Object.assign(this.itemObject, {name: this.item});
        this.okAction.emit(resultItem);
        break;
      }
      case 'create': {
        const resultItem = {name: this.item, parentCategory: this.itemObject ? this.itemObject._id : null};
        this.okAction.emit(resultItem);
        break;
      }
      case 'delete': {
        this.okAction.emit(this.itemObject);
        break;
      }
      default: break;
    }
    this.hidden = true;
  }

}
