import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyemailService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  //resquest = User
   sendemail(request: any)  {
            return this.http.post<String>(`${this.baseUrl}/sendingemail`
                , request, {  responseType: 'text' as 'json' });
        }

  Verifyemail(token: any, email: any ) : Observable<boolean>{
       return this.http.get<boolean>(`${this.baseUrl}/confirm?token=${token}&email=${email}`);
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
