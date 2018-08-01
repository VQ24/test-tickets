import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private router: Router, private route: ActivatedRoute, private service: TestService) { }

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

  public updateTicket(tick) {
    this.ticket$ = this.service.updateTicket(tick);
    // this.router.navigate(['../'], { relativeTo: this.route });
  }

  public saveTicket(tick) {
    this.service.createTicket(tick);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
