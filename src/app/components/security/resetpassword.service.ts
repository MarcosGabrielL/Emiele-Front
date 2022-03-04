import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {

   baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  processForgotPassword(email: any): Observable<string>{
    
      return this.http.post<string>(`${this.baseUrl}/forgot_password?email=${email}`, email, {  responseType: 'text' as 'json' });
  }

  processResetPassword(token: string, email: string, password: string): Observable<string>{
      return this.http.post<string>(`${this.baseUrl}/reset_password?email=${email}&token=${token}&password=${password}`
        , email, {  responseType: 'text' as 'json' });
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

}
