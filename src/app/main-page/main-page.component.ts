import { Component, OnInit } from '@angular/core';
import { TestService } from '../service/test-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit {

  public tickets$: Observable<any>;

  constructor(private service: TestService) { }

  ngOnInit() {
  }

  loadData() {
    this.tickets$ = this.service.getAllTickets();
  }

  deleteTicket(ticket) {
    console.log(ticket);
  }

}
