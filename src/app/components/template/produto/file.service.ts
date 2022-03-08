import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest, HttpEventType, HttpResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  // Properties
  theme: string;
  id: number;
  hideProgressBar: boolean;
  maxSize: number;
  uploadAPI: string;
  method: string;
  formatsAllowed: string;
  formatsAllowedText: string;
  multiple: boolean;
  headers: {};
  params: {};
  responseType: 'json' | 'arraybuffer' | 'blob' | 'text';
  hideResetBtn: boolean;
  hideSelectBtn: boolean;
  allowedFiles: File[] = [];
  notAllowedFiles: {
    fileName: string;
    fileSize: string;
    errorMsg: string;
  }[] = [];
  Caption: string[] = [];
  isAllowedFileSingle = true;
  progressBarShow = false;
  enableUploadBtn = false;
  uploadMsg = false;
  afterUpload = false;
  uploadStarted = false;
  uploadMsgText: string;
  uploadMsgClass: string;
  uploadPercent: number;
  currentUploads: any[] = [];
  fileNameIndex = true;
  withCredentials = false;
  autoUpload = false;

  baseUrl: String = environment.baseUrlVendas;

   constructor(private http: HttpClient) {  
  }

  uploadSingleFile(file: File, id: any): Observable<any> {

     

    const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data'
  })
};

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('idproduct', id);
    console.log(formData);
    const req = new HttpRequest('POST', `${this.baseUrl}/uploadFile?idproduct=${id}`, formData,{
        reportProgress: true
        
      });

      return this.http
      .request('POST', `${this.baseUrl}/uploadFile`, {
        body: formData,
        reportProgress: true,
        observe: 'events',
        headers:  new HttpHeaders({
            'Content-Type': 'multipart/form-data'
          }),
        params: this.params,
        responseType: this.responseType,
        withCredentials: this.withCredentials,
      })/*.subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // calculate the progress percentage

         // const percentDone = Math.round((100 * event.loaded) / event.total);
          // pass the percentage into the progress-stream
          console.log("Aqui");
          //progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          // Close the progress-stream if we get an answer form the API
          // The upload is complete
         // progress.complete();
         console.log("Aqui1");
        }
      });*/;

    /* return this.http.post<any>(
      `https://emiele-service-vendas.herokuapp.com/uploadFile`,
      formData,{  reportProgress: true, headers:  new HttpHeaders({
            'Content-Type': 'multipart/form-data'
          })}
      );*/
  }

  
}