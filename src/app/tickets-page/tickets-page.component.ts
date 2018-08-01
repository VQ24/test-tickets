import { Component, OnInit } from '@angular/core';
import { TestService } from '../service/test-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tickets-page',
  templateUrl: './tickets-page.component.html'
})
export class TicketsPageComponent implements OnInit {

  public tickets$: Observable<any>;

  constructor(private service: TestService) { }

  ngOnInit() {
    this.tickets$ = this.service.tickets$;
  }

  public loadData() {
    this.service.loadAllTickets();
  }

  public deleteTicket(ticket) {
    this.service.deleteTicket(ticket._id);
  }

}
