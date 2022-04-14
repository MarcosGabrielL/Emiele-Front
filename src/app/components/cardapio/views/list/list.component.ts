import {Component, OnInit, ChangeDetectorRef, ViewEncapsulation, NgModule} from '@angular/core';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {tap, map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Produto,ProdutoDTO } from './../../../../../app/components/template/produto/produto.model';
import { Venda, Evento, ResponseVendas, Vendido, Tem, Notification  } from './../../../../../app/components/template/produto/venda.model';
import { User,Vendedor } from './../../../../../app/components/security/user.model';
import { VendaService } from './../../../../../app/components/template/produto/venda.service';
import {LoginService} from './../../../../../app/components/security/login.service'
import { NgxDropzoneModule } from 'ngx-dropzone';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer,SafeHtml,SafeUrl } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";

import {FileService} from './../../../../../app/components/template/produto/file.service';
import {FileDB} from './../../../../../app/components/template/produto/file.model'

import { ProdutoService } from './../../../../../app/components/template/produto/produto.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  host: {'(document:submit)': 'onKeyUp($event)'},
  styleUrls: ['../../../../../app/app.component.css']
})
export class ListComponent implements OnInit {

  idvendedor: string = "";
  tipo: string = "";

  produtos: ProdutoDTO[]=[];
  todosprodutos: ProdutoDTO[]=[];
 Semtipo: ProdutoDTO[]=[];
 Hamburguer: ProdutoDTO[]=[];
 Sushi: ProdutoDTO[]=[];
 Pizza: ProdutoDTO[]=[];
 Bolo: ProdutoDTO[]=[];
   Sorvete: ProdutoDTO[]=[];
     Bebida: ProdutoDTO[]=[];
       Pasteis: ProdutoDTO[]=[];
       Lanche: ProdutoDTO[]=[];
       Massa: ProdutoDTO[]=[];
       Refeicao: ProdutoDTO[]=[];
       Higienelar: ProdutoDTO[]=[];
       Higienepessoal: ProdutoDTO[]=[];
       Perfumaria: ProdutoDTO[]=[];
       Utilidades: ProdutoDTO[]=[];
       Campo: ProdutoDTO[]=[];
       Padaria: ProdutoDTO[]=[];
       Acougue: ProdutoDTO[]=[];
       Enlatados: ProdutoDTO[]=[];
       Doces: ProdutoDTO[]=[];
       biscoitos: ProdutoDTO[]=[];
       Cereais: ProdutoDTO[]=[];
       Outros: ProdutoDTO[]=[];
       dog: ProdutoDTO[]=[];
       fruta: ProdutoDTO[]=[];
       pet: ProdutoDTO[]=[];

       successMessage: string = "";
  errorMessage: string = "";
   nome1: string="";  
   token: any="";

   image: SafeUrl = "";
  temimagem: boolean = false;
  imagemdb: FileDB;
  vendedor: Vendedor = {
    id: "",
     nomefantasia: "", 
    descricao: "",
    rua: "",
    telefone: "",
    email: ""
  }


 constructor(private cdRef: ChangeDetectorRef,private authenticationService: LoginService,
              private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private vendaService: VendaService,
              private snackBar: MatSnackBar,
              private cd: ChangeDetectorRef,
              private sanitized: DomSanitizer,
              private modalService: NgbModal,
              private FileService: FileService,
              private produtoservice: ProdutoService) { }

  ngOnInit(): void {
    this.idvendedor = this.route.snapshot.paramMap.get("idvendedor")!;
     this.tipo = this.route.snapshot.paramMap.get("categoria")!;

     console.log(this.idvendedor)
     this.CarregaVendedor();
    this.CarregaProdutoByVendedorAndTipo();
  }

  CarregaProdutoByVendedorAndTipo(){

    this.produtoservice.findDTOByIdVendedor(this.idvendedor, "1").subscribe((result: ProdutoDTO[])=> {

      this.todosprodutos = result;
      this.produtos= [];
      console.log(result);

      if(this.tipo==="Todos"){

      this.produtos= result;
      }else{

                     result.forEach( (evento: ProdutoDTO) => { 

                                        if(this.tipo===evento.tipo){
                                           this.produtos.push(evento); 
                                            }

                                             });
                     }

                                          }, () => {
                                this.errorMessage = 'Error ao Carregar Produtos';
                                      this.vendaService.mensagem(this.errorMessage);
                                  
                               }); 
  

       
  }

  BuscarProdutoByVendedorAndTipo(){

    if(this.nome1 === ""){
      this.CarregaProdutoByVendedorAndTipo();
    }else{
      //let count = 0;
      let novosprodutos = this.produtos;
      this.produtos = [];
      novosprodutos.forEach( (evento: ProdutoDTO) => {

            if(evento.codigo.indexOf(this.nome1) != -1){
               console.log(evento);
          this.produtos.push(evento);
          //count = count +1;
        }
       });
    }

    console.log(this.produtos);
  }

  SafeUrl(data: any): SafeUrl{

    return this.sanitized.bypassSecurityTrustUrl('data:image/png;base64,'+data);
                                                  

}

CarregaVendedor(){
   this.token = localStorage.getItem('this.TOKEN_SESSION_ATTRIBUTE');
  this.authenticationService.getVendedorById(+this.idvendedor, this.token).subscribe((resposta: Vendedor) => {


                                this.vendedor = resposta;
                                console.log('Vendedor: ');
                                console.log(this.vendedor);

                                //Busca Imagem de perfil
                                this.FileService.findByIdVendedor(this.idvendedor, this.token).subscribe((resposta: FileDB[]) => {

                                    this.imagemdb = resposta[0];

                                    if(resposta.length == 0){
                                      this.temimagem = false;
                                      this.image = "https://i.pinimg.com/originals/76/47/2e/76472e433e19ec424f7f6b8933380f93.png";
                                    }else{
                                       this.temimagem = true;
                                     // this.files.push(resposta[0].data);
                                      this.image = this.sanitized.bypassSecurityTrustUrl('data:image/png;base64,'+resposta[0].data);
                                    }


                                   }, () => {
                                    this.temimagem = false;
                                      this.image = "https://i.pinimg.com/originals/76/47/2e/76472e433e19ec424f7f6b8933380f93.png";
                              console.log('Error ao Buscar Dados Loja');
                                   this.authenticationService.mensagem('Error ao Buscar Dados da Loja');
                                  
                               });


               }, () => {

                                 this.temimagem = false;
                                      this.image = "https://i.pinimg.com/originals/76/47/2e/76472e433e19ec424f7f6b8933380f93.png";
                              console.log('Error ao Buscar Dados Vendedor');
                                 this.authenticationService.mensagem('Error ao Buscar Dados Vendedor');
                               });

}

}
