import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ticketReducer } from './reducer/tickets.reducer';

import { TestService } from './service/test-service';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';

import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { TicketsPageComponent } from './tickets-page/tickets-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TicketsListComponent } from './tickets-page/tickets-list/tickets-list.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { TicketEditComponent } from './tickets-page/tickets-list/ticket-edit/ticket-edit.component';
import { TicketPreviewComponent } from './tickets-page/tickets-list/ticket-edit/ticket-preview/ticket-preview.component';
import { CategoryService } from './service/category-service';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { CategoriesListItemComponent } from './categories-page/categories-list-item/categories-list-item.component';
import { CategoriesFlatPageComponent } from './categories-page/categories-flat-page.component';
import { CategoriesSetupPageComponent } from './categories-setup-page/categories-setup-page.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { FormatButtonsComponent } from './tickets-page/tickets-list/ticket-edit/format-buttons/format-buttons.component';
import { TicketTagsComponent } from './ticket-tags/ticket-tags.component';
import { PaginationComponent } from './pagination/pagination-component';
import { SideNavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    MainPageComponent,
    TicketsPageComponent,
    TicketsListComponent,
    EscapeHtmlPipe,
    TicketEditComponent,
    TicketPreviewComponent,
    FormatButtonsComponent,
    TicketTagsComponent,
    CategoriesPageComponent,
    CategoriesListItemComponent,
    CategoriesFlatPageComponent,
    CategoriesSetupPageComponent,
    ModalWindowComponent,
    PaginationComponent,
    SideNavComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TextareaAutosizeModule,
    StoreModule.forRoot({ appStore: ticketReducer }),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    TestService,
    CategoryService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
