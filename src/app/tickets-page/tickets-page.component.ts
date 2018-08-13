import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TestService } from '../service/test-service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/zip';

@Component({
  selector: 'app-tickets-page',
  templateUrl: './tickets-page.component.html'
})
export class TicketsPageComponent implements OnInit {

  public tickets$: Observable<any>;
  public isLoading$: Observable<boolean>;

  constructor(private service: TestService) { }

  public ngOnInit() {
    this.service.tickets$.subscribe(data => {
      if (!data || !data.length) {
        this.loadData();
      }
    });
    this.tickets$ = this.service.tickets$;
    this.isLoading$ = this.service.isLoading$;
  }

  public loadData() {
    this.service.loadAllTickets();
  }

  public deleteTicket(ticket) {
    this.service.deleteTicket(ticket._id);
  }

}
