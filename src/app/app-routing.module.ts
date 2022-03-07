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
    component: RtlComponent
   }
   ,
   {
    path: 'billing',
    component: BillingComponent
   },
   {
    path: 'tables',
    component: TableComponent
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
        children: [
                    {path: 'gerencia',  component:GerenciaProdutoComponent , pathMatch: 'full'},
                     {path: 'home', component: ListaComponent, pathMatch: 'full'}
                  ]
   }  

   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
