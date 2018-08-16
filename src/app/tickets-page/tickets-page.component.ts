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

  public filterCategories: string[] = [];

  constructor(private service: TestService) { }

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
    const getTagsFilter = filter.tags && filter.tags.length ? { tags: filter.tags } : {};
    const resultFiter = Object.assign(filterCategoriesObject, getRandomFilter, getTagsFilter);
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
