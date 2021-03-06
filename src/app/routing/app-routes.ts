import { Routes } from '@angular/router';
import { TicketEditComponent } from '../tickets-page/tickets-list/ticket-edit/ticket-edit.component';
import { TicketsPageComponent } from '../tickets-page/tickets-page.component';
import { MainPageComponent } from '../main-page/main-page.component';
import { SettingsPageComponent } from '../settings-page/settings-page.component';

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
        path: 'settings',
        data: {
          breadcrumb: 'Settings'
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: ''
            },
            component: SettingsPageComponent
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
