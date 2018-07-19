import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TestService {

  constructor(private http: HttpClient) { }

  public getAllTickets() {
    const apiUrl = 'http://localhost:1980/tickets';
    return this.http.get(apiUrl);
  }

  public getFilteredTickets(filter: Object) {
    const apiUrl = 'http://localhost:1980/tickets';
    const filterObject = {filter: JSON.stringify(filter)};
    return this.http.get(apiUrl, {params: filterObject});
  }

  public deleteTicket(id: string) {
    const apiUrl = 'http://localhost:1980/ticket';
    return this.http.delete(apiUrl, {params: {_id: id}});
  }
}
