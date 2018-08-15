import { Component, OnInit, ViewChild } from '@angular/core';
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

  public filterCategories: string[] = [];

  constructor(private service: TestService) { }

  @ViewChild('settings') public settingsSideNav;

  public ngOnInit() {
    this.tickets$ = this.service.tickets$;
    this.isLoading$ = this.service.isLoading$;
  }

  public loadData() {
    this.service.loadAllTickets();
  }

  public loadFilteredData (filter) {
    this.filterCategories = filter.categories;
    const filterCategoriesObject = {byCategory: filter.categories};
    const getRandomFilter = filter.loadRandom && filter.loadRandom.on && +filter.loadRandom.numberOfTickets ?
      { getRandom: +filter.loadRandom.numberOfTickets } : {};
    const resultFiter = Object.assign(filterCategoriesObject, getRandomFilter);
    this.service.getFilteredTickets(resultFiter);
  }

  public deleteTicket(ticket) {
    this.service.deleteTicket(ticket._id);
  }

  public settingsOpen() {
    this.settingsSideNav.open();
  }

  public onCategoriesChoose(categories) {
    this.filterCategories = categories;
  }

}
