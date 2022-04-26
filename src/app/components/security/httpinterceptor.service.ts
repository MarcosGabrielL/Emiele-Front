import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private authenticationService: LoginService,  public router: Router) { }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
            return next.handle(req);
        
    }

    async canActivate(): Promise<boolean> {
    if (!await this.authenticationService.isUserLoggedIn()) {
        this.authenticationService.mensagem("Sessão finalizada! Por Favor Faça Login Novamente");
      await this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
