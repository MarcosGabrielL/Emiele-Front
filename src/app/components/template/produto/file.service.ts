import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest, HttpEventType, HttpResponse} from '@angular/common/http';
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
    formData.append('file', file, file.name);
    formData.append('idproduct', id);
    console.log(formData);
    const req = new HttpRequest('POST', 'https://emiele-service-vendas.herokuapp.com/uploadFile', formData,{
        reportProgress: true
        
      });

      return this.http.request(req);

    // this.http.post<any>(
      //`https://emiele-service-vendas.herokuapp.com/uploadFile`,
      //formData,
      //{
        //reportProgress: true,
        //ob//serve: 'events'
        
      //});
  }

  
}
