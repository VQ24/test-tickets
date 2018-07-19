import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TestService {

  private apiUrl = 'http://localhost:1980/tickets';

  constructor(private http: HttpClient) { }

  public getAllTickets() {
    return this.http.get(this.apiUrl);
  }

  public getFilteredTickets(filter: Object) {
    const filterObject = {filter: JSON.stringify(filter)};
    return this.http.get(this.apiUrl, {params: filterObject});
  }
}
