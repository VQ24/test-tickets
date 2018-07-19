import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TestService } from './service/test-service';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TicketsListComponent } from './main-page/tickets-list/tickets-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TicketsListComponent,
    EscapeHtmlPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    TestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
