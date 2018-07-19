import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html'
})

export class TicketsListComponent implements OnInit {

  @Input() public tickets: any[];

  @Output() public deleteTicket: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onDelete(event) {
    this.deleteTicket.emit(event);
  }

  showAnswer(ticket) {
    ticket.showAnswer = true;
  }
}
