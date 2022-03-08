import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {FileService} from '../file.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FileDetails} from '../file.model';
import { ProdutoService } from '../produto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Produto} from '../produto.model';
import {LoginService} from '../../../../../app/components/security/login.service'
import { User } from '../../../../../app/components/security/user.model';


@Component({
  selector: 'app-gerencia-produto',
  templateUrl: './gerencia-produto.component.html',
  styleUrls: ['../../../../../app/app.component.css']
})
export class GerenciaProdutoComponent implements OnInit {

  newProduct: Produto = {
    id: "",
    codigo:"",
    descrição:"",
    preçoUn: 0,
    quantidade: 0,
    tipo:"",
    unidade:"",
    data:"",
    vendedor_id:""
  } 
    successMessage: string = "";
  errorMessage: string = "";
preco: number;
descricao: string = "";

  token: any;
  loaded = 0;
  selectedFiles: FileList;
  uploadedFiles: FileDetails[] = [];
  showProgress = false;

  constructor(private authenticationService: LoginService,
    private router: Router,
    private http: HttpClient,
    private fileService: FileService,
    private snackBar: MatSnackBar,
    private produtoservice: ProdutoService) {
  }

  ngOnInit(): void {
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  SaveProduct(){



 
    this.newProduct.preçoUn = this.preco;
    this.newProduct.descrição = this.descricao;
   
    //Pega data formatada
      //  this.posttextaoservice.getHoraServidor().subscribe((resposta: string) => {
        //    this.hora = resposta;
          //  console.log(resposta);
        // }); 
    this.newProduct.data = "9:43:11";
     
    console.log('Token:'+localStorage.getItem('this.TOKEN_SESSION_ATTRIBUTE'));
    this.token = localStorage.getItem('this.TOKEN_SESSION_ATTRIBUTE');
    //Verifica se está logado
                if(this.authenticationService.isUserLoggedIn()){
                    //Pega email do usuario logado
                    let email = this.authenticationService.getLoggedInUserName();
                        //Pega usuario pelo email
                        this.authenticationService.getByEmail(email).subscribe((resposta: User) => {
                           // this.usuario = resposta;
                            console.log('vendedor id'+ resposta.id);
                            this.newProduct.vendedor_id  = resposta.id.toString();
               
            }, () => {
               this.produtoservice.mensagem("Erro ao Carregar Usuario! Por Favor Faça o Login e Tente Novamente");
             }); 
               }; 

console.log(this.newProduct);


      this.produtoservice.create(this.newProduct, this.token).subscribe((result)=> {
        this.successMessage = 'Produto Salvo com sucesso!';
        this.produtoservice.mensagem(this.successMessage); 
             this.upload();
    }, () => {
  this.errorMessage = 'Error ao Salvar produto';
        this.produtoservice.mensagem(this.errorMessage);
        
     }); 

     
  }


  upload() {
    this.showProgress = true;
    this.uploadedFiles = [];
    Array.from(this.selectedFiles).forEach(file => {
      const fileDetails = new FileDetails();
      fileDetails.name = file.name;
      this.uploadedFiles.push(fileDetails);
      this.fileService.uploadSingleFile(file, "1").subscribe(event => {
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
          console.log("Foi");
          
        }

      }, () => {
                console.log("Não foi:"+event);
              });
    });
  }

  ExcluiProduct(){
      let id = this.newProduct.codigo;
      this.router.navigate(['/produtos/home']);
  }

  Cancela(){
      //Volta para todos produtos
        this.router.navigate(['/produtos/home']);
  }

}