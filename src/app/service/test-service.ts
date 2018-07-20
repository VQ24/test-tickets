import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

@Injectable()
export class TestService {

  constructor(private http: HttpClient,
              private store: Store<any>) { }

  public tickets$ = this.store.select('appStore').map(wholeStore => wholeStore.tickets);

  // -------------- app functions ---------------------

  public loadAllTickets() {
    this._getAllTickets().subscribe(data => {
      this.store.dispatch({type: 'GET_TICKETS', payload: data});
    });
  }

  public getTicket(ticketNum: string) {
    this.tickets$.subscribe(data => {
      if (!data.length) {
        this.loadAllTickets();
      }
    });
    return this.tickets$.map(tickets => tickets.filter(ticket => ticket._id === ticketNum)[0]);
  }

  public getFilteredTickets(filter: Object) {

  }

  public deleteTicket(id: string) {

  }

  // ----------- back end functions --------------------

  private _getAllTickets() {
    const apiUrl = 'http://localhost:1980/tickets';
    return this.http.get(apiUrl);
  }

  private _getFilteredTickets(filter: Object) {
    const apiUrl = 'http://localhost:1980/tickets';
    const filterObject = {filter: JSON.stringify(filter)};
    return this.http.get(apiUrl, {params: filterObject});
  }

  private _deleteTicket(id: string) {
    const apiUrl = 'http://localhost:1980/ticket';
    return this.http.delete(apiUrl, {params: {_id: id}});
  }

}
