import { Routes } from '@angular/router';
import { TicketEditComponent } from '../tickets-page/tickets-list/ticket-edit/ticket-edit.component';
import { TicketsPageComponent } from '../tickets-page/tickets-page.component';
import { MainPageComponent } from '../main-page/main-page.component';

export const ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'tickets',
        children: [
          {
            path: 'edit',
            component: TicketEditComponent,
          },
          {
            path: '',
            component: TicketsPageComponent
          }
        ]
      },
      {
        path: '',
        component: MainPageComponent
      }
    ]
  }

];

