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


import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {PlatformModule} from '@angular/cdk/platform';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';


import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpInterceptorService } from './components/security/httpinterceptor.service';


import { VerificarEmailComponent } from './components/security/verificar-email/verificar-email.component';
import { RecuperarsenhaComponent } from './components/security/recuperarsenha/recuperarsenha.component';
import { AtualizarsenhaComponent } from './components/security/atualizarsenha/atualizarsenha.component';
import { SelecionatipoComponent } from './components/views/selecionatipo/selecionatipo.component';
import { EmailsucessComponent } from './components/template/emailsucess/emailsucess.component';
import { EmailfailComponent } from './components/template/emailfail/emailfail.component';
import { GerenciaProdutoComponent } from './components/template/produto/gerencia-produto/gerencia-produto.component';
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { ProdutoComponent } from './components/template/produto/produto/produto.component';
import { ListaComponent } from './components/template/produto/lista/lista.component';

@NgModule({
  declarations: [
    AppComponent,
    BillingComponent,
    DashboardComponent,
    ProfileComponent,
    RtlComponent,
    SigninComponent,
    SignupComponent,
    TableComponent,
    VerificarEmailComponent,
    RecuperarsenhaComponent,
    AtualizarsenhaComponent,
    SelecionatipoComponent,
    EmailsucessComponent,
    EmailfailComponent,
    GerenciaProdutoComponent,
    HeaderComponent,
    FooterComponent,
    ProdutoComponent,
    ListaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    PlatformModule,
    NgbModule,
    NgxDropzoneModule,
    MatProgressBarModule,
    MatIconModule
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
