import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Perfil} from './perfilpagamento.model';


@Injectable({
  providedIn: 'root'
})
export class PerfilpagamentoService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

    getById(id: String): Observable<Perfil>{
     const url = `${this.baseUrl}/perfispagamento/perfil/${id}`
     return this.http.get<Perfil>(url)
    }

      mensagem(str: string): void {
        console.log(str);
        this._snack.open(`${str}`, 'X', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar'],
          duration: 4000
        })
        }

        Save(vendedor: Perfil, token: any): Observable<Perfil>  {
            return this.http.post<Perfil>(`${this.baseUrl}/perfispagamento/perfil/add?token=${token}`
                , vendedor, {  responseType: 'text' as 'json' });
        }

      AtualizaVendedor(vendedor: Perfil, token: any, id: any): Observable<Perfil>  {
            return this.http.post<Perfil>(`${this.baseUrl}/perfispagamento/perfil/update/${id}?token=${token}`
                , vendedor, {  responseType: 'text' as 'json' });
        }
}
