import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ticket-preview',
  templateUrl: './ticket-preview.component.html'
})
export class TicketPreviewComponent implements OnInit, OnChanges {

  @Input() public ticket: any;

  @Output() public saveTicket: EventEmitter<any> = new EventEmitter();

  public edit = {
    question: false,
    answer: false
  };

  ticketForm = new FormGroup({
    question: new FormControl(),
    answer: new FormControl(),
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

  public onSave() {
    if (this.ticket._id) {
      this.saveTicket.emit(Object.assign({_id: this.ticket._id}, this.ticketForm.value));
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
}
