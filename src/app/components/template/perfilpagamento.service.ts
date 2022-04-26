import {HttpClient, HttpEvent, HttpRequest, HttpEventType, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Perfil, NewPreferenceDTO , Root , ResultPago, RootDTO, AutenticacionResponse} from './perfilpagamento.model';


@Injectable({
  providedIn: 'root'
})
export class PerfilpagamentoService {

  baseUrl: String = environment.baseUrl;
  baseUrlVendas: String = environment.baseUrlVendas;
  AppID: String = environment.AppID;
  SECRET_KEY: String = environment.SECRET_KEY;
  accessToken: String = environment.accessToken;
  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

    getById(id: String): Observable<Perfil>{
     const url = `${this.baseUrl}/perfispagamento/perfil/${id}`
     return this.http.get<Perfil>(url)
    }

    getByIdVendedor(email: String): Observable<Perfil>{
     const url = `${this.baseUrl}/perfispagamento/perfil/user/${email}`
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
        mensagemsucess(str: string): void {
        console.log(str);
        this._snack.open(`${str}`, 'X', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbarsucess'],
          duration: 4000
        })
        }
        mensagemerro(str: string): void {
        console.log(str);
        this._snack.open(`${str}`, 'X', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbarerro'],
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

        EnviaCredenciais1(code: any): Observable<AutenticacionResponse>{

            /*
               curl -X POST \
                'https://api.mercadopago.com/oauth/token' \
                -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
                -H 'Content-Type: application/json' \
                -d '{
              "client_secret": "client_secret",
              "client_id": "client_id",
              "grant_type": "authorization_code",
              "code": "TG-XXXXXXXX-241983636"
            }'
            */

                let body = new URLSearchParams();
                body.set('grant_type', "authorization_code");
                body.set('client_id', this.AppID.toString());
                body.set('client_secret', this.SECRET_KEY.toString());
                body.set('code', code);
               // body.set('redirect_uri', "emiele.herokuapp.com");



                let options = {
                    headers: new HttpHeaders({
                      // 'Content-Type': 'application/json',
                       'Authorization': `Bearer ${this.accessToken}`
                    })
                };


             return this.http.post<AutenticacionResponse>(`https://api.mercadopago.com/oauth/token`
                , body.toString(), options);
        }

          EnviaCredenciais(code: any): Observable<AutenticacionResponse>{

            /*
                curl -X POST \
                -H 'accept: application/json' \
                -H 'content-type: application/x-www-form-urlencoded' \
                'https://api.mercadolibre.com/oauth/token' \
                -d 'grant_type=authorization_code' \
                -d 'client_id=$APP_ID' \
                -d 'client_secret=$SECRET_KEY' \
                -d 'code=$SERVER_GENERATED_AUTHORIZATION_CODE' \
                -d 'redirect_uri=$REDIRECT_URI'
            */

                let body = new URLSearchParams();
                body.set('grant_type', 'authorization_code');
                body.set('client_id', this.AppID.toString());
                body.set('client_secret', this.SECRET_KEY.toString());
                body.set('code', code);
                body.set('redirect_uri', 'https://emiele-service-vendas.herokuapp.com/generic/oauth');

//add Access-Control-Allow-Origin "*"
//Header add Access-Control-Allow-Methods: "GET,POST,OPTIONS,DELETE,PUT"

                let options = {
                    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                };


             return this.http.post<AutenticacionResponse>(`https://api.mercadolibre.com/oauth/token`
                , body.toString(), options);
        }

        SalvaCredenciais(AutenticacionResponse: AutenticacionResponse, id: any): Observable<AutenticacionResponse>  {
            return this.http.post<AutenticacionResponse>(`${this.baseUrlVendas}/create/add?id=${id}`
                , AutenticacionResponse, {  responseType: 'text' as 'json' });
        }
        
}
















