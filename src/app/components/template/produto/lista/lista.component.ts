import {Component, OnInit, ChangeDetectorRef, ViewEncapsulation, NgModule} from '@angular/core';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {tap, map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Produto,ProdutoDTO } from './../../../../../app/components/template/produto/produto.model';
import { ProdutoService } from './../../../../../app/components/template/produto/produto.service';
import { FileService } from './../../../../../app/components/template/produto/file.service';
import {FileDB} from './../../../../../app/components/template/produto/file.model'
import { Venda, Evento } from './../../../../../app/components/template/produto/venda.model';
import { ResponseVendas } from './../../../../../app/components/template/produto/venda.model';
import { Vendido, Tem, Notification } from './../../../../../app/components/template/produto/venda.model';
import { User } from './../../../../../app/components/security/user.model';
import { VendaService } from './../../../../../app/components/template/produto/venda.service';
import {LoginService} from './../../../../../app/components/security/login.service'
import { NgxDropzoneModule } from 'ngx-dropzone';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer,SafeHtml, SafeUrl} from '@angular/platform-browser';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['../../../../../app/app.component.css']
})
export class ListaComponent implements OnInit {

    vendidohoje: String = "";
  percenthoje: String = "";
  vendashoje: String = "";
  percentvendashoje: String = "";
  novosclientes: String = "";
  novosclientespercent: String = "";
  ticketmedio: String = "";
  ticketmediopercent: String = "";

  htmlvendas: SafeHtml = "";

  vendedor_id: String = "";

  vendas: Venda[];
  produtos: ProdutoDTO[];
  newprodutos: ProdutoDTO[];
  eventos: Evento[];
  tem0:boolean= true;
  tem1:boolean= false;
  tem2:boolean= false;
  tem3:boolean= false;
  tem4:boolean= false;
  tem5:boolean= false;
  cont: number = 0;
   cont1: number = 0;
   cont2: number = 0;


  successMessage: string = "";
  errorMessage: string = "";
  token: any;
  comprador: User = {
     id: 0,
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  }

  images: SafeUrl[] = [];

  mostranotify: boolean;
  mostralist: boolean = false;
  mostramenu: boolean = false;
  selectedVenda: Venda;
  notfycunt: String = "";
  Notification: Notification[];
  mostraprodutos: boolean = false;

  constructor(private cdRef: ChangeDetectorRef,private authenticationService: LoginService,
              private router: Router,
              private http: HttpClient,
              private vendaService: VendaService,
              private produtoService: ProdutoService,
              private snackBar: MatSnackBar,
              private cd: ChangeDetectorRef,
              private sanitized: DomSanitizer,
              private fileservice: FileService) { }

  ngOnInit(): void {


this.isLoggedin();
 
   

  }

  EditarProduto(id: any){

  }


  CarregaProdutos(){

    this.produtoService.findDTOByIdVendedor(this.vendedor_id, this.token).subscribe((result: ProdutoDTO[])=> {
                                  

                                    this.produtos = result;
                                    console.log("Lista de Produtos: ");
                                    console.log(result);

                                   
                                             // this.produtos.forEach( (evento: ProdutoDTO) => { 

                                                //this.newprodutos.
                                                //images.push(this.sanitized.bypassSecurityTrustUrl('data:image/png;base64,' + evento.data));
                                                    
                                              // });


                              }, () => {
                                this.errorMessage = 'Error ao Carregar Produtos';
                                      this.vendaService.mensagem(this.errorMessage);
                                  
                               }); 

  }

  isLoggedin(){

        this.token = localStorage.getItem('this.TOKEN_SESSION_ATTRIBUTE');
    //Verifica se está logado
                if(this.authenticationService.isUserLoggedIn()){
                    //Pega email do usuario logado
                    let email = this.authenticationService.getLoggedInUserName();
                        //Pega usuario pelo email
                        this.authenticationService.getByEmail(email).subscribe((resposta: User) => {

                            this.vendedor_id  = resposta.id.toString();
                            console.log( this.vendedor_id);
                              this.CarregaProdutos();

                            }, () => {
                               this.vendaService.mensagem("Erro ao Carregar Usuario! Por Favor Faça o Login e Tente Novamente");
                             }); 


               };  

}


SafeUrl(data: any): SafeUrl{

    return this.sanitized.bypassSecurityTrustUrl('data:image/png;base64,'+data);
                                                  

}

Editor(id: number){

      console.log('ID Produto: '+id);

       this.produtoService.setId(id);      

      this.router.navigate(['/produtos/gerencia']); 

}


}
