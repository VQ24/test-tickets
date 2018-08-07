import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket-preview',
  templateUrl: './ticket-preview.component.html'
})
export class TicketPreviewComponent implements OnInit, OnChanges {

  @Input() public ticket: any;
  @Input() public editTicket: boolean;

  @Output() public updateTicket: EventEmitter<any> = new EventEmitter();
  @Output() public saveTicket: EventEmitter<any> = new EventEmitter();

  public edit = {
    question: false,
    answer: false
  };

  ticketForm = new FormGroup({
    question: new FormControl('', Validators.required),
    answer: new FormControl('', Validators.required),
  });

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.hasOwnProperty('ticket') && changes.ticket.currentValue) {
      this.ticketForm.patchValue({
        question: this.ticket.question,
        answer: this.ticket.answer
      });
    }
  }

  public applyAnswerText() {
    this.ticket.answer = this.ticketForm.value.answer;
    this.edit.answer = !this.edit.answer;
  }

  public cancelAnswerText() {
    this.ticketForm.patchValue({
      answer: this.ticket.answer
    });
    this.edit.answer = !this.edit.answer;
  }

  public applyQuestionText() {
    this.ticket.question = this.ticketForm.value.question;
    this.edit.question = !this.edit.question;
  }

  public cancelQuestionText() {
    this.ticketForm.patchValue({
      question: this.ticket.question,
    });
    this.edit.question = !this.edit.question;
  }

  public onChooseCategory(categoryId: string) {
    this.ticket.category = categoryId;
  }

  public onSave() {
    if (this.editTicket) {
      this.updateTicket.emit(Object.assign(this.ticket, this.ticketForm.value));
    } else {
      this.saveTicket.emit(this.ticketForm.value);
    }
  }

  public makeBold(element, value: string) {
    if (window.getSelection) {
      const selection = window.getSelection();
      const replaceText = '<b>' + selection.toString() + '</b>';
      const newText = element.value.slice(0, element.selectionStart) + replaceText + element.value.slice(element.selectionEnd);
      this.ticketForm.patchValue({[value]: newText});
    }
  }

  public makeItalic(element, value: string) {
    if (window.getSelection) {
      const selection = window.getSelection();
      const replaceText = '<i>' + selection.toString() + '</i>';
      const newText = element.value.slice(0, element.selectionStart) + replaceText + element.value.slice(element.selectionEnd);
      this.ticketForm.patchValue({[value]: newText});
    }
  }

  public makeSup(element, value: string) {
    if (window.getSelection) {
      const selection = window.getSelection();
      const replaceText = '<sup>' + selection.toString() + '</sup>';
      const newText = element.value.slice(0, element.selectionStart) + replaceText + element.value.slice(element.selectionEnd);
      this.ticketForm.patchValue({[value]: newText});
    }
  }

  public makeSub(element, value: string) {
    if (window.getSelection) {
      const selection = window.getSelection();
      const replaceText = '<sub>' + selection.toString() + '</sub>';
      const newText = element.value.slice(0, element.selectionStart) + replaceText + element.value.slice(element.selectionEnd);
      this.ticketForm.patchValue({[value]: newText});
    }
  }

  public makeH3(element, value: string) {
    if (window.getSelection) {
      const selection = window.getSelection();
      const replaceText = '<h3>' + selection.toString() + '</h3>';
      const newText = element.value.slice(0, element.selectionStart) + replaceText + element.value.slice(element.selectionEnd);
      this.ticketForm.patchValue({[value]: newText});
    }
  }

  public makeH4(element, value: string) {
    if (window.getSelection) {
      const selection = window.getSelection();
      const replaceText = '<h4>' + selection.toString() + '</h4>';
      const newText = element.value.slice(0, element.selectionStart) + replaceText + element.value.slice(element.selectionEnd);
      this.ticketForm.patchValue({[value]: newText});
    }
  }

  public makeH5(element, value: string) {
    if (window.getSelection) {
      const selection = window.getSelection();
      const replaceText = '<h5>' + selection.toString() + '</h5>';
      const newText = element.value.slice(0, element.selectionStart) + replaceText + element.value.slice(element.selectionEnd);
      this.ticketForm.patchValue({[value]: newText});
    }
  }

  public makePre(element, value: string) {
    if (window.getSelection) {
      const selection = window.getSelection();
      const replaceText = '<pre>' + String.fromCharCode(10) +
                            selection.toString().split('<').join('&lt') +
                          String.fromCharCode(10) + '</pre>';
      const newText = element.value.slice(0, element.selectionStart) + replaceText + element.value.slice(element.selectionEnd);
      this.ticketForm.patchValue({[value]: newText});
    }
  }

  public highlightBlock(element, value: string) {
    if (window.getSelection) {
      const selection = window.getSelection();
      const replaceText = '<div class="highlighted">' + selection.toString() + '</div>';
      const newText = element.value.slice(0, element.selectionStart) + replaceText + element.value.slice(element.selectionEnd);
      this.ticketForm.patchValue({[value]: newText});
    }
  }

  public clearTag(element, value: string) {
    if (window.getSelection) {
      const selection = window.getSelection();
      let replaceText = selection.toString();
      const regexp = /<.*?>/;
      let result;
      while ((result = regexp.exec(replaceText))) {
        replaceText = replaceText.replace(result[0], '');
      }
      const newText = element.value.slice(0, element.selectionStart) + replaceText + element.value.slice(element.selectionEnd);
      this.ticketForm.patchValue({[value]: newText});
    }
  }
}
