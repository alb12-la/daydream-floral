import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDatepickerModule, NgbModalModule, NgbModule, NgbTimepickerModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { InvoiceDisplayComponent } from './components/invoice-display/invoice-display.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { customNgbDateFRParserFormatter } from './ngb-date-fr-parser-formatter'
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceFormComponent,
    InvoiceDisplayComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTimepickerModule,
    NgbDatepickerModule,
    NgbModule,
    NgbModalModule,
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/ats-invoice' },
    { provide: NgbDateParserFormatter, useClass: customNgbDateFRParserFormatter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
