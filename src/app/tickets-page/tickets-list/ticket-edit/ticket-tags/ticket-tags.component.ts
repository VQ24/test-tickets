import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ticket-tags',
  templateUrl: './ticket-tags.component.html'
})

export class TicketTagsComponent {

  @Input() public tags: string[];

  @Output() public updateTags: EventEmitter<any> = new EventEmitter();

  @ViewChild('inputField') public inputTagField;

  public addTag(tag: string) {
    if (!this.tags.filter(tg => tg === tag.trim()).length && tag.trim() && this.validTag(tag)) {
      this.tags.push(tag.trim());
      this.inputTagField.nativeElement.value = '';
      this.updateTags.emit(this.tags);
    }
  }

  public deteteTag(tag: string) {
    this.tags = this.tags.filter(tg => tg !== tag);
    this.updateTags.emit(this.tags);
  }

  private validTag (str: string) {
    const norm = RegExp(/\W/);
    return !norm.test(str);
  }
}
