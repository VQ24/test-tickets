import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/startWith';
import { Subject } from 'rxjs';

@Injectable()
export class TestService {

  constructor(private http: HttpClient,
              private store: Store<any>) { }

  public tickets$ = this.store.select('appStore').map(wholeStore => wholeStore.tickets);

  private isLoading = new Subject<boolean>();
  public isLoading$ = this.isLoading.asObservable();

  private updateLoadingSubject(newBoolVar: boolean) {
     this.isLoading.next(newBoolVar);
  }

  // -------------- app functions ---------------------

  public loadAllTickets() {
    this.updateLoadingSubject(true);
    this._getAllTickets()
      .finally(() => this.updateLoadingSubject(false))
      .subscribe(data => {
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
    this.updateLoadingSubject(true);
    this._getFilteredTickets(JSON.stringify(filter))
      .finally(() => this.updateLoadingSubject(false))
      .subscribe(data => {
      this.store.dispatch({type: 'GET_TICKETS', payload: data});
    });
  }

  public deleteTicket(id: string) {
    this._deleteTicket(id).subscribe(() => {
      this.store.dispatch({type: 'DELETE_TICKET', payload: id});
    });
  }

  public updateTicket(ticket) {
    this._updateTicket(ticket).subscribe(() => {
      this.store.dispatch({type: 'UPDATE_TICKET', payload: ticket});
    });
    return this.getTicket(ticket._id);
  }

  public createTicket(ticket) {
    this._createTicket(ticket).subscribe((data: any) => {
      this.store.dispatch({type: 'ADD_TICKET', payload: data.ticket});
    });
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

  private _updateTicket(ticket) {
    const apiUrl = 'http://localhost:1980/ticket';
    return this.http.put(apiUrl, ticket);
  }

  private _createTicket(ticket) {
    const apiUrl = 'http://localhost:1980/ticket';
    return this.http.post(apiUrl, ticket);
  }

}
