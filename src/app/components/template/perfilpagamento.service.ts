import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Perfil, NewPreferenceDTO , Root , ResultPago, RootDTO} from './perfilpagamento.model';


@Injectable({
  providedIn: 'root'
})
export class PerfilpagamentoService {

  baseUrl: String = environment.baseUrl;
  baseUrlVendas: String = environment.baseUrlVendas;
  
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

        createPreference(NewPreferenceDTO : NewPreferenceDTO ): Observable<Root>   {
            return this.http.post<Root>(`${this.baseUrlVendas}/create`
                , NewPreferenceDTO, {  responseType: 'text' as 'json' });
        }

        savePreference(NewPreference : RootDTO, token: any ): Observable<RootDTO>   {
            return this.http.post<RootDTO>(`${this.baseUrlVendas}/preferences/preference/add?token=${token}`
                , NewPreference, {  responseType: 'text' as 'json' });
        }

        getResultpagos(id: String, token: any): Observable<ResultPago>{
            const url = `${this.baseUrlVendas}/resultpagos/resultpago/user/${id}?token=${token}`
                return this.http.get<ResultPago>(url)
        }

        
}
