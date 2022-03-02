import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BillingComponent } from './components/views/billing/billing.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { ProfileComponent } from './components/views/profile/profile.component';
import { RtlComponent } from './components/views/rtl/rtl.component';
import { SigninComponent } from './components/security/signin/signin.component';
import { SignupComponent } from './components/security/signup/signup.component';
import { TableComponent } from './components/views/table/table.component';


import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpInterceptorService } from './components/security/httpinterceptor.service';

import { FormsModule } from '@angular/forms';

import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    BillingComponent,
    DashboardComponent,
    ProfileComponent,
    RtlComponent,
    SigninComponent,
    SignupComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpInterceptorService,
          multi: true
        }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
