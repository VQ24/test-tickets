import { Component, OnInit } from '@angular/core';
import { TestService } from '../service/test-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html'
})
export class TicketEditComponent implements OnInit {

  constructor(private service: TestService) { }

  ngOnInit() {
  }

}
