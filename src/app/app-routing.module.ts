import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';




import { SigninComponent } from './components/security/signin/signin.component';
import { SignupComponent } from './components/security/signup/signup.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { ProfileComponent } from './components/views/profile/profile.component';
import { RtlComponent } from './components/views/rtl/rtl.component';
import { BillingComponent } from './components/views/billing/billing.component';
import { TableComponent } from './components/views/table/table.component';
import { HttpInterceptorService } from './components/security/httpinterceptor.service';
import { VerificarEmailComponent } from './components/security/verificar-email/verificar-email.component';
import { EmailsucessComponent } from './components/template/emailsucess/emailsucess.component';
import { EmailfailComponent } from './components/template/emailfail/emailfail.component';
import { RecuperarsenhaComponent } from './components/security/recuperarsenha/recuperarsenha.component';
import { AtualizarsenhaComponent } from './components/security/atualizarsenha/atualizarsenha.component';
import { GerenciaProdutoComponent } from './components/template/produto/gerencia-produto/gerencia-produto.component';
import { ProdutoComponent } from './components/template/produto/produto/produto.component';
import { ListaComponent } from './components/template/produto/lista/lista.component';

import { HomeComponent } from './components/marketplaceweb/views/home/home/home.component';
import { CheckoutComponent } from './components/marketplaceweb/views/checkout/checkout.component';
import { CartComponent } from './components/marketplaceweb/views/cart/cart.component';
import { ContactComponent } from './components/marketplaceweb/views/contact/contact.component';
import { BlogComponent } from './components/marketplaceweb/views/blog/blog.component';
import { IndexComponent } from './components/marketplaceweb/views/home/index/index.component';
import { BuscaComponent } from './components/marketplaceweb/views/home/busca/busca.component';
import { ProductPageComponent } from './components/marketplaceweb/views/product-page/product-page.component';
import { Erro404Component } from './components/template/erro404/erro404.component';

import { ListComponent } from './components/cardapio/views/list/list.component';
import { CardapiohomeComponent } from './components/cardapio/views/cardapiohome/cardapiohome.component';

const routes: Routes = [
{ path: '', redirectTo: '/home', pathMatch: 'full' },
   {
    path: 'home',
    component: SigninComponent
   },
   {
    path: 'cadastrar',
    component: SignupComponent
   },
   {
    path: 'index',
    component: DashboardComponent,
    canActivate: [ HttpInterceptorService ]
   },
   {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ HttpInterceptorService ]
   }
   ,
   {
    path: 'rtl',
    component: RtlComponent,
    canActivate: [ HttpInterceptorService ]
   }
   ,
   {
    path: 'billing',
    component: BillingComponent,
    canActivate: [ HttpInterceptorService ]
   },
   {
    path: 'tables',
    component: TableComponent,
    canActivate: [ HttpInterceptorService ]
   },
   {
    path: 'confirm',
    component: VerificarEmailComponent,
      children: [
                    {path: 'sucess',  component: EmailsucessComponent, pathMatch: 'full'},
                    { path: 'fail', component: EmailfailComponent, pathMatch: 'full'}
                  ]
   },
   {
    path: 'forgotpassword',
    component: RecuperarsenhaComponent
   },
   {
    path: 'reset_password',
    component: AtualizarsenhaComponent
   },
   {
    path: 'produtos',
    component: ProdutoComponent,
    canActivate: [ HttpInterceptorService ],
        children: [
                    {path: 'gerencia',  component:GerenciaProdutoComponent , pathMatch: 'full'},
                     {path: 'home', component: ListaComponent, pathMatch: 'full'}
                  ]
   },
   {
    path: 'cardapio',
    component: CardapiohomeComponent
   },
    {
    path: 'cardapio/:categoria',
    component: ListComponent
   },
   {
    path: 'shop',
    component: HomeComponent,
    canActivate: [ HttpInterceptorService ],
        children: [
                    {path: '',  component: IndexComponent, pathMatch: 'full'},
                    { path: 'checkout', component: CheckoutComponent, pathMatch: 'full'},
                    { path: 'cart', component: CartComponent, pathMatch: 'full'},
                    { path: 'contact', component: ContactComponent, pathMatch: 'full'},
                    { path: 'blog', component: BlogComponent, pathMatch: 'full'},
                    { path: 'busca', component: BuscaComponent, pathMatch: 'full'},
                    { path: 'produto/:id', component: ProductPageComponent, pathMatch: 'full'},
                    { path: 'produto-nao-encontrado', pathMatch: 'full', component: Erro404Component }
                  ]
   },
    { path: '**', pathMatch: 'full', 
        component: Erro404Component }

   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
