import { Component, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
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
    this.service.tickets$.subscribe(data => {
      if (!data || !data.length) {
        this.loadData();
      }
    });
    this.tickets$ = this.service.tickets$;
    this.isLoading$ = this.service.isLoading$;
  }

  public loadData() {
    this.service.loadAllTickets();
  }

  public loadFilteredData (categories) {
    this.filterCategories = categories;
    const filterObject = {category: {$in: categories}};
    console.log(filterObject);
    this.service.getFilteredTickets(categories);
    console.log(this.filterCategories);
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
