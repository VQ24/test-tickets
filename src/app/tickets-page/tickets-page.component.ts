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

  @ViewChild('settings') public settingsSideNav;

  public tickets$: Observable<any>;
  public isLoading$: Observable<boolean>;

  public filter: any = {categories: []};

  constructor(private ticketService: TestService) { }

  public ngOnInit() {
    this.tickets$ = this.ticketService.tickets$;
    this.isLoading$ = this.ticketService.isLoading$;
  }

  public loadData() {
    this.loadFilteredData(this.filter);
  }

  public loadFilteredData (filter) {
    this.filter = filter;
    const filterCategoriesObject = filter.categories && filter.categories.length ? { byCategory: filter.categories } : {};
    const getRandomFilter = filter.loadRandom && filter.loadRandom.on && +filter.loadRandom.numberOfTickets ?
      { getRandom: +filter.loadRandom.numberOfTickets } : {};
    const getTagsFilter = filter.tags && filter.tags.length ? { tags: filter.tags } : {};
    const resultFiter = Object.assign(filterCategoriesObject, getRandomFilter, getTagsFilter);
    this.ticketService.getFilteredTickets(resultFiter);
  }

  public deleteTicket(ticket) {
    this.ticketService.deleteTicket(ticket._id);
  }

  public settingsOpen() {
    this.settingsSideNav.open();
  }

  public onCategoriesChoose(categories) {
    this.filter.categories = categories;
  }

}
