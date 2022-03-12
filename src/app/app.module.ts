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

import { AngularFileUploaderModule } from "angular-file-uploader";
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { HomeComponent } from './components/marketplaceweb/views/home/home/home.component';
import { BuscaComponent } from './components/marketplaceweb/views/home/busca/busca.component';
import { HomeDestaqueComponent } from './components/marketplaceweb/views/home/home-destaque/home-destaque.component';
import { HomeDestaqueFestividadeComponent } from './components/marketplaceweb/views/home/home-destaque-festividade/home-destaque-festividade.component';
import { HomeDestaqueHojeComponent } from './components/marketplaceweb/views/home/home-destaque-hoje/home-destaque-hoje.component';
import { HomeDestaqueTopvisitComponent } from './components/marketplaceweb/views/home/home-destaque-topvisit/home-destaque-topvisit.component';
import { HomeNewslleterComponent } from './components/marketplaceweb/views/home/home-newslleter/home-newslleter.component';
import { HomeSlideComponent } from './components/marketplaceweb/views/home/home-slide/home-slide.component';
import { HomeSlideCategoriasComponent } from './components/marketplaceweb/views/home/home-slide-categorias/home-slide-categorias.component';
import { BlogComponent } from './components/marketplaceweb/views/blog/blog.component';
import { CartComponent } from './components/marketplaceweb/views/cart/cart.component';
import { CheckoutComponent } from './components/marketplaceweb/views/checkout/checkout.component';
import { ContactComponent } from './components/marketplaceweb/views/contact/contact.component';
 

import { CarouselModule } from 'ngx-owl-carousel-o';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CarouselHomeComponent } from './components/marketplaceweb/views/home/carousel-home/carousel-home.component';
import { IndexComponent } from './components/marketplaceweb/views/home/index/index.component';
import { ProductPageComponent } from './components/marketplaceweb/views/product-page/product-page.component';
import { Erro404Component } from './components/template/erro404/erro404.component';

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
    ListaComponent,
    HomeComponent,
    BuscaComponent,
    HomeDestaqueComponent,
    HomeDestaqueFestividadeComponent,
    HomeDestaqueHojeComponent,
    HomeDestaqueTopvisitComponent,
    HomeNewslleterComponent,
    HomeSlideComponent,
    HomeSlideCategoriasComponent,
    BlogComponent,
    CartComponent,
    CheckoutComponent,
    ContactComponent,
    CarouselHomeComponent,
    IndexComponent,
    ProductPageComponent,
    Erro404Component
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
    MatIconModule,
    AngularFileUploaderModule,
    MaterialFileInputModule, 
    CarouselModule,
    MatToolbarModule,
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
