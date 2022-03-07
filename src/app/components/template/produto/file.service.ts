import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  //

   constructor(private http: HttpClient) {  
  }

  uploadSingleFile(file: File, id: any): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('idproduct', id);
    console.log(formData);
    
    return this.http.post<any>(
      `https://emiele-service-vendas.herokuapp.com/uploadFile`,
      formData,
      {
        reportProgress: true,
        observe: 'events'
        
      });
  }

  
}
