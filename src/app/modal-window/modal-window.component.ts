import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html'
})

export class ModalWindowComponent {

  @Input() public header = '';

  @Output() public saveAction: EventEmitter<any> = new EventEmitter();

  public item: any;
  public hidden = true;

  private itemObject: any;
  private options: string;

  public open (item: any, options: string) {
    this.itemObject = item;
    this.options = options;
    switch (options) {
      case 'category name edit': {
        this.item = item.name;
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
      case 'category name edit': {
        const resultItem = Object.assign(this.itemObject, {name: this.item});
        this.saveAction.emit(resultItem);
        break;
      }
      default: break;
    }
    this.hidden = true;
  }

}
