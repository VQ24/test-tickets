import { Routes } from '@angular/router';
import { TicketEditComponent } from '../tickets-page/tickets-list/ticket-edit/ticket-edit.component';
import { TicketsPageComponent } from '../tickets-page/tickets-page.component';
import { MainPageComponent } from '../main-page/main-page.component';
import { CategoriesPageComponent } from '../categories-page/categories-page.component';

export const ROUTES: Routes = [
  {
    path: '',
    data: {
      breadcrumb: ''
    },
    children: [
      {
        path: 'tickets',
        data: {
          breadcrumb: 'Tickets'
        },
        children: [
          {
            path: 'edit',
            data: {
              breadcrumb: 'Edit'
            },
            component: TicketEditComponent,
          },
          {
            path: '',
            data: {
              breadcrumb: ''
            },
            component: TicketsPageComponent
          }
        ]
      },
      {
        path: 'categories',
        data: {
          breadcrumb: 'Edit Categories'
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: ''
            },
            component: CategoriesPageComponent
          }
        ]
      },
      {
        path: '',
        data: {
          breadcrumb: ''
        },
        component: MainPageComponent
      }
    ]
  }

];
