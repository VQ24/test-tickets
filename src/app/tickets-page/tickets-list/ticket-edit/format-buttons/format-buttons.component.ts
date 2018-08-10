import { Component, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-format-buttons',
  templateUrl: './format-buttons.component.html'
})

export class FormatButtonsComponent {

  @Input() public area: any;

  @Output() public formatBold: EventEmitter<any> = new EventEmitter();
  @Output() public formatItalic: EventEmitter<any> = new EventEmitter();
  @Output() public formatLiftUp: EventEmitter<any> = new EventEmitter();
  @Output() public formatPullDown: EventEmitter<any> = new EventEmitter();
  @Output() public formatPre: EventEmitter<any> = new EventEmitter();
  @Output() public formatHighlight: EventEmitter<any> = new EventEmitter();
  @Output() public formatH3: EventEmitter<any> = new EventEmitter();
  @Output() public formatH4: EventEmitter<any> = new EventEmitter();
  @Output() public formatH5: EventEmitter<any> = new EventEmitter();
  @Output() public formatClear: EventEmitter<any> = new EventEmitter();

  public makeBold() {
    this.formatBold.emit(this.area);
  }

  public makeItalic() {
    this.formatItalic.emit(this.area);
  }

  public makeSup() {
    this.formatLiftUp.emit(this.area);
  }

  public makeSub() {
    this.formatPullDown.emit(this.area);
  }

  public makePre() {
    this.formatPre.emit(this.area);
  }

  public highlightBlock() {
    this.formatHighlight.emit(this.area);
  }

  public makeH3() {
    this.formatH3.emit(this.area);
  }

  public makeH4() {
    this.formatH4.emit(this.area);
  }

  public makeH5() {
    this.formatH5.emit(this.area);
  }

  public clearTag() {
    this.formatClear.emit(this.area);
  }

}
