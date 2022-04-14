import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {FileService} from '../file.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FileDetails,FileDB} from '../file.model';
import { ProdutoService } from '../produto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Produto} from '../produto.model';
import {LoginService} from '../../../../../app/components/security/login.service'
import { User } from '../../../../../app/components/security/user.model';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { DomSanitizer,SafeHtml, SafeUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-gerencia-produto',
  templateUrl: './gerencia-produto.component.html',
  styleUrls: ['../../../../../app/app.component.css']
})
export class GerenciaProdutoComponent implements OnInit {

  newProduct: Produto = {
    id: "",
    codigo:"",
    descricao:"",
    precoun: 0,
    quantidade: 0,
    tipo:"Sem tipo",
    unidade:"UN",
    data:"",
    vendedor_id:"" 
  } 
    successMessage: string = "";
  errorMessage: string = "";
preco: number;
descricao: String = "";


  vendedor_id: number;
  token: any;
  loaded = 0;
  selectedFiles: FileList;
  uploadedFiles: FileDetails[] = [];
  showProgress = false;
  files: File[] = [];
  closeResult = '';

  imagnes: FileDB[];

  id: number;

  constructor(private authenticationService: LoginService,
    private router: Router,
    private http: HttpClient,
    private fileService: FileService,
    private snackBar: MatSnackBar,
    private produtoservice: ProdutoService,
    private sanitized: DomSanitizer,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {

this.id = this.produtoservice.getId()
    if(this.id>0){
          this.buscaproduto(this.id);
    }
  }

   private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  onSelect(event : any) {
  console.log(event);
  this.files.push(...event.addedFiles);
}

onRemove(event: any) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}

open(content: any) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  selectFile(event: any) {
    this.files.push(...event.addedFiles);
    //this.selectedFiles = event.target.files;
  }

  SaveProduct(){



 
    this.newProduct.precoun = this.preco;
    this.newProduct.descricao = this.descricao;
   
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
                           // console.log('vendedor id'+ resposta.id);
                            this.newProduct.vendedor_id  = resposta.id.toLocaleString(); 
                            console.log('vendedor id'+this.newProduct.vendedor_id);
                            this.vendedor_id= resposta.id;
                            console.log('Produto');
                            console.log(this.newProduct);

                             this.produtoservice.create(this.newProduct, this.token, this.newProduct.vendedor_id).subscribe((result: Produto)=> {
        this.successMessage = 'Produto Salvo com sucesso!';
        this.produtoservice.mensagem(this.successMessage); 

        this.newProduct.id = result.id;

        //this.newProduct = result;
        //console.log(result);
        if(this.files.length == 0){
          this.router.navigate(['/produtos/home']); 
        }else{
             this.upload();
           }
    }, () => {
  this.errorMessage = 'Error ao Salvar produto';
        this.produtoservice.mensagem(this.errorMessage);
        
     }); 
               
            }, () => {
               this.produtoservice.mensagem("Erro ao Carregar Usuario! Por Favor Faça o Login e Tente Novamente");
             }); 
               };  

//console.log(this.newProduct); 


     

     
  }


  upload() {
    this.showProgress = true;
    this.uploadedFiles = [];
    Array.from(this.files).forEach(file => {
      
      console.log(file);

      const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
         this.authenticationService.mensagem("Only images are supported.");
        return;
    }

      this.fileService.uploadSingleFile(file, this.newProduct.id).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
           // calculate the progress percentage
//
          console.log("Aqui");
          let aqui: number = event!.total;
            this.authenticationService.mensagem('Salvando Imagens: '+Math.round((100 * event.loaded) / aqui) + '%...');
          //const percentDone = Math.round((100 * event.loaded) / event.total);
          // pass the percentage into the progress-stream
        //  progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          //progress.complete();
          console.log("Foi");
          this.router.navigate(['/produtos/home']); 
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

  buscaproduto(id: any){

       this.produtoservice.findById(id, this.token).subscribe((result: Produto)=> {
                                  

                                    
                                    console.log("Produto: ");
                                    console.log(result);

                                     this.newProduct.id = result.id;
                                      this.newProduct.codigo= result.codigo;
                                      this.descricao = result.descricao;
                                      this.preco = result.precoun;
                                      this.newProduct.quantidade = result.quantidade;
                                      this.newProduct.tipo="Sem tipo";
                                      this.newProduct.unidade = result.unidade;
                                      
                                      this.buscaimagens(id);


                              }, () => {
                                this.errorMessage = 'Error ao Carregar Produtos';
                                      this.produtoservice.mensagem(this.errorMessage);
                                  
                               }); 
  }

  buscaimagens(id:any){

      this.fileService.findByIdProduto(id, this.token).subscribe((result: FileDB[])=> {
                                  

                                     this.imagnes = result;


                              }, () => {
                                this.errorMessage = 'Error ao Carregar Imagens';
                                      this.produtoservice.mensagem(this.errorMessage);
                                  
                               }); 
  }

  SafeUrl(data: any): SafeUrl{

    return this.sanitized.bypassSecurityTrustUrl('data:image/png;base64,'+data);
     
}

excluiImagem(id: any){
     this.fileService.deleteById(id, this.token).subscribe((result: any)=> {
                                  

                                    // this.imagnes = result;


                              }, () => {
                                this.errorMessage = 'Error ao Deletar Imagens';
                                      this.produtoservice.mensagem(this.errorMessage);
                                  
                               }); 
}

}