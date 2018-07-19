import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { TestService } from './service/test-service';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TicketsListComponent } from './main-page/tickets-list/tickets-list.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TicketsListComponent,
    EscapeHtmlPipe,
    TicketEditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    TestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
