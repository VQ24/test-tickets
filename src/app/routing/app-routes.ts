import { Routes } from '@angular/router';
import { TicketEditComponent } from '../main-page/tickets-list/ticket-edit/ticket-edit.component';
import { MainPageComponent } from '../main-page/main-page.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'tickets',
    pathMatch: 'full'
  },
  {
    path: 'tickets',
    children: [
      {
        path: 'edit',
        component: TicketEditComponent,
      },
      {
        path: '',
        component: MainPageComponent
      }
    ]
  }
];
