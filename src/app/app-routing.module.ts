import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/security/signin/signin.component';
import { SignupComponent } from './components/security/signup/signup.component';

const routes: Routes = [
{ path: '', redirectTo: '/home', pathMatch: 'full' },
   {
    path: 'home',
    component: SigninComponent
   },
   {
    path: 'cadastrar',
    component: SignupComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
