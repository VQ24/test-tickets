import { Component, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {

  constructor(private router: Router) { }

  showRoutes() {
      console.log(this.router.parseUrl(this.router.url).root.children.primary.segments);
  }

  ngOnChanges() {
    console.log(this.router.parseUrl(this.router.url).root.children.primary.segments);
  }
}
