import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html'
})

export class TicketsListComponent implements OnInit {

  @Input() public tickets: any[];

  @Output() public deleteTicket: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  public onDelete(event) {
    this.deleteTicket.emit(event);
  }

  public showAnswer(ticket) {
    ticket.showAnswer = ticket.showAnswer ? false : true;
  }

  public editTicket(ticket) {
    this.router.navigate(['./edit', { ticketId: ticket._id }], { relativeTo: this.route });
  }

}
