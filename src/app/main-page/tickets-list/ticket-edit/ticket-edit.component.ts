import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from '../../../service/test-service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html'
})
export class TicketEditComponent implements OnInit {

  public ticket$: any;
  public edit: boolean;

  constructor(private route: ActivatedRoute, private service: TestService) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      if (data.ticketId) {
        this.edit = true;
        this.ticket$ = this.service.getTicket(data.ticketId);
      } else {
        this.edit = false;
        this.ticket$ = Observable.of({answer: '', question: ''});
      }
    });
  }

  updateTicket(tick) {
    this.ticket$ = this.service.updateTicket(tick);
  }
}
