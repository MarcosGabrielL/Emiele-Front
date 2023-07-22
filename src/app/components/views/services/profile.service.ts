import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest, HttpEventType, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Banners, CorModel} from './profile.model'
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrlConfig: String = environment.baseUrlConfig;
  baseUrlVendas: String = environment.baseUrlVendas;

  constructor(private http: HttpClient) { }

   uploadSingleFile(file: File, idvendedor: any, id: any): Observable<any> {

     

    const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data'
  })
  };

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('idvendedor', idvendedor);
    formData.append('id', id);
    console.log(formData);
    const req = new HttpRequest('POST', `${this.baseUrlVendas}/loja/banner/BanneruploadFile?idvendedor=${idvendedor}?id=${id}`, formData,{
        reportProgress: true
        
      });

      return this.http
      .request('POST', `${this.baseUrlVendas}/loja/banner/BanneruploadFile`, {
        body: formData,
        reportProgress: true,
        observe: 'events'
      })
  }

  deleteByVendedorId(idvendedor: any): any {
    const url = `${this.baseUrlVendas}/banner/delete/${idvendedor}`
    return this.http.get<any>(url)
  }

   findColorsByIdVendedor(idvendedor: any, token: string): Observable<CorModel> {
    const url = `${this.baseUrlConfig}/cores/Cor/usuario/${idvendedor}?token=${token}`
    return this.http.get<CorModel>(url)
  }

  AtualizaCoresVendedor(cores: CorModel, token: any): Observable<CorModel>  {
            return this.http.post<CorModel>(`${this.baseUrlConfig}/cores/Cor/add?token=${token}`
                , cores, {  responseType: 'text' as 'json' });
        }


}
