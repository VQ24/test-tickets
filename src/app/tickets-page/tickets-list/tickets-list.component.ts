import { Component, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Pagination } from '../../models/pagination';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html'
})

export class TicketsListComponent implements OnChanges {

  @Input() public tickets: any[];
  @Input() public ticketsToShowOnPage: number;
  @Input() public isLoading: boolean;

  @Output() public deleteTicket: EventEmitter<any> = new EventEmitter();

  @ViewChild('modalDeleteTicket') public deleteModalWindow;

  public paginationInfo: Pagination;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  public ngOnChanges() {
    this.paginationInfo = {
      offset: 0,
      limit: this.ticketsToShowOnPage || 5,
      total: this.tickets.length,
    };
  }

  public showViaPagination(itemNumber: number): boolean {
    return itemNumber >= this.paginationInfo.offset && itemNumber < this.paginationInfo.offset + this.paginationInfo.limit;
  }

  public onDeleteButtonClick(ticket) {
    this.deleteModalWindow.open(ticket, 'delete ticket');
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
