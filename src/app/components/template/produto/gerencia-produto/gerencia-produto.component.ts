import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {FileService} from '../file.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FileDetails} from '../file.model';

@Component({
  selector: 'app-gerencia-produto',
  templateUrl: './gerencia-produto.component.html',
  styleUrls: ['../../../../../app/app.component.css']
})
export class GerenciaProdutoComponent implements OnInit {
 
  loaded = 0;
  selectedFiles: FileList;
  uploadedFiles: FileDetails[] = [];
  showProgress = false;

  constructor(private http: HttpClient, private fileService: FileService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.showProgress = true;
    this.uploadedFiles = [];
    Array.from(this.selectedFiles).forEach(file => {
      const fileDetails = new FileDetails();
      fileDetails.name = file.name;
      this.uploadedFiles.push(fileDetails);
      this.fileService.uploadSingleFile(file, "1")
        .pipe(tap(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.loaded = Math.round(100 * event.loaded / 100);
            fileDetails.progress = this.loaded;
          }
        })).subscribe(event => {
        if (event instanceof HttpResponse) {
          if (this.selectedFiles.item(this.selectedFiles.length - 1) === file) {
            // Invokes fetchFileNames() when last file in the list is uploaded.
            //this.fileService.fetchFileNames();
            console.log("Foi");
            console.log(event);
          }
        }
      }, () => {
                console.log("Não foi:"+event);
              });
    });
  }

}