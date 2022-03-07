import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  //

   constructor(private http: HttpClient) {
  }

  uploadSingleFile(file: File, id: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    console.log(formData);

    let httpHeaders = new HttpHeaders();
httpHeaders = httpHeaders.set('Content-Type', 'multipart/form-data');
// depending on the server settings might also be needed 
httpHeaders = httpHeaders.set('Accept', 'application/json');
httpHeaders = httpHeaders.set('Access-Control-Allow-Origin', '*');

    return this.http.post<any>(
      `https://emiele-service-vendas.herokuapp.com/uploadFile?idproduct=${id}`,
      formData,
      {
        reportProgress: true,
        observe: 'events',
        headers: httpHeaders
        
      });
  }

  
}
