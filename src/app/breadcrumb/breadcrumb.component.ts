import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})


export class BreadcrumbComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {}

  public breadcrumbs$ = this.router.events
    .filter(event => event instanceof NavigationEnd)
    .distinctUntilChanged()
    .map(event =>  this.buildBreadCrumb(this.route.root))
    .map(breadcrumbs => breadcrumbs.filter(data => data.label));

  ngOnInit() {
    this.breadcrumbs$.subscribe(data => console.table(data));
  }

  public buildBreadCrumb(route: ActivatedRoute, breadcrumbs = []) {
    const label = route.routeConfig ? route.routeConfig.data['breadcrumb'] : 'Home';
    const breadcrumb = {
        label: label,
    };
    const newBreadcrumbs = [ ...breadcrumbs, breadcrumb ];
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }

}
