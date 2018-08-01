import { Component } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})

export class BreadcrumbComponent {

  public url: Observable<any>;

  constructor(private router: Router, private route: ActivatedRoute, location: Location) {
    this.url = router.events;
   }

  showUrl() {
    this.url.subscribe(data => {
      console.log(data);
    });
    console.log(this.route);
  }
}
