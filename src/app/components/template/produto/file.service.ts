import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest, HttpEventType, HttpResponse, HttpHeaders} from '@angular/common/http';
import {FileDB} from './file.model'
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
        observe: 'events'
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

  findAll():Observable<File[]> {
    const url = `${this.baseUrl}/files`
    return this.http.get<File[]>(url)
  }
  
   findByIdProduto(id: any, token: string): Observable<FileDB[]> {
    const url = `${this.baseUrl}/filelist/produto/${id}`
    return this.http.get<FileDB[]>(url)
  }

  findByIdVendedor(id: any, token: string): Observable<FileDB[]> {
    const url = `${this.baseUrl}/filelist/loja/${id}`
    return this.http.get<FileDB[]>(url)
  }

   findById(id: any, token: string): Observable<File> {
    const url = `${this.baseUrl}/file/${id}`
    return this.http.get<File>(url)
  }

  deleteById(id: any, token: string): any {
    const url = `${this.baseUrl}/file/delete/${id}`
    return this.http.get<any>(url)
  }

  SalvaFotoLoja(file: File, id: any): Observable<any> {

     

    const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data'
  })
  };

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('idproduct', id);

      return this.http
      .request('POST', `${this.baseUrl}/loja/saveFile`, {
        body: formData,
        reportProgress: true,
        observe: 'events'
      })
  }

   AtualizaFotoLoja(file: File, iddovendedor: any, iddofile: any): Observable<any> {

     

    const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data'
  })
  };

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('idproduct', iddovendedor);
    formData.append('id', iddofile);

      return this.http
      .request('POST', `${this.baseUrl}/loja/uploadFile`, {
        body: formData,
        reportProgress: true,
        observe: 'events',
        headers:  new HttpHeaders({
            'Content-Type': 'multipart/form-data'
          }),
        params: this.params,
        responseType: this.responseType,
        withCredentials: this.withCredentials,
      })
  }

  
}