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
    this.saveTicket.emit(this.ticketForm.value);
  }
}
