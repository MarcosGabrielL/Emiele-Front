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
    component: DashboardComponent
   },
   {
    path: 'profile',
    component: ProfileComponent
    ,
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
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
