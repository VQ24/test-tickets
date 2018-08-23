import { Component, OnInit, ViewChild } from '@angular/core';
import { TestService } from '../service/test-service';
import { SettingsService } from '../service/settings-service';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';
import { FilterSettings } from '../models/settings';

@Component({
  selector: 'app-tickets-page',
  templateUrl: './tickets-page.component.html'
})
export class TicketsPageComponent implements OnInit {

  @ViewChild('settings') public settingsSideNav;

  public tickets$: Observable<Ticket[]>;
  public settings$: Observable<FilterSettings>;
  public isLoading$: Observable<boolean>;

  public filter: any = {categories: []};

  constructor(private ticketService: TestService,
              private settingsService: SettingsService) { }

  public ngOnInit() {
    this.settingsService.settings$.subscribe(data => {
      if (!data || !data.length) {
        this.settingsService.loadAllSettings();
      }
    });
    this.settings$ = this.settingsService.settings$
      .map(settings => settings.filter(stng => stng.default)[0])
      .map(setting => setting && setting.filterSettings ? setting.filterSettings : null);
    this.tickets$ = this.ticketService.tickets$;
    this.isLoading$ = this.ticketService.isLoading$;
    // this.isLoading$ = this.ticketService.isLoading$.startWith(true);
    // this.loadData();
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
