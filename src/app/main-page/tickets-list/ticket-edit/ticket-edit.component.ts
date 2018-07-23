import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from '../../../service/test-service';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html'
})
export class TicketEditComponent implements OnInit {

  public ticket$: any;

  constructor(private route: ActivatedRoute, private service: TestService) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.ticket$ = this.service.getTicket(data.ticketId);
    });
  }

  updateTicket(tick) {
    this.ticket$ = this.service.updateTicket(tick);
  }
}
