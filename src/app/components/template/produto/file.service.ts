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

       this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // calculate the progress percentage
//
          console.log("Aqui");

          //const percentDone = Math.round((100 * event.loaded) / event.total);
          // pass the percentage into the progress-stream
        //  progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          //progress.complete();
          console.log("Aqui 1");
        }
      });

    return this.http.post<any>(
      `https://emiele-service-vendas.herokuapp.com/uploadFile`,
      formData,
      {
        reportProgress: true,
        observe: 'events'
        
      });
  }

  
}
