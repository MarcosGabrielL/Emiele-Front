import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User, Vendedor } from './../../../app/components/security/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: String = environment.baseUrl;
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: string = "";
  public password: string = "";

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

    authenticationService(request: any) {
       /* console.log("User: " + email + " Senha: " + password);
        return this.http.post(`${this.baseUrl}/authenticate`,
          { headers: { authorization: this.createBasicAuthToken(email, password) } }).pipe(map((res) => {
            this.username = email;
            this.password = password;
            this.registerSuccessfulLogin(email, password);
          }));*/

          return this.http.post<String>(`${this.baseUrl}/authenticate`, request, {  responseType: 'text' as 'json' });
           
      
      }

      createBasicAuthToken(username: string, password: string) {
        return 'Basic ' + window.btoa(username + ":" + password)
      }

      registerSuccessfulLogin(username: string, password: string) {
        sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
      }

      logout() {
        sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
        this.username = "";
        this.password = "";
      }

      isUserLoggedIn() {
        let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
      }

      getLoggedInUserName() {
        let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
      }

       getByEmail(email: String): Observable<User>{
     const url = `${this.baseUrl}/user/${email}`
     return this.http.get<User>(url)
    }

       getById(id: String): Observable<User>{
     const url = `${this.baseUrl}/user/id/${id}`
     return this.http.get<User>(url)
    }

      mensagem(str: string): void {
        console.log(str);
        this._snack.open(`${str}`, 'OK', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar'],
          duration: 4000
        })
        }

      getVendedorById(id: number, token: String): Observable<Vendedor>{
     const url = `${this.baseUrl}/vendedores/vendedor/${id}?token=${token}`
     return this.http.get<Vendedor>(url)
   }

      AtualizaVendedor(vendedor: any, token: any): Observable<Vendedor>  {
            return this.http.post<Vendedor>(`${this.baseUrl}/vendedores/vendedor/add?token=${token}`
                , vendedor, {  responseType: 'text' as 'json' });
        }

     

    }