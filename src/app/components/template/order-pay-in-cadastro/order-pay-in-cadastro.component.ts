import {Component, OnInit, ChangeDetectorRef, ViewEncapsulation, NgModule} from '@angular/core';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {tap, map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Produto } from './../../../../app/components/template/produto/produto.model';
import { Venda, Evento } from './../../../../app/components/template/produto/venda.model';
import { ResponseVendas } from './../../../../app/components/template/produto/venda.model';
import { Vendido, Tem, Notification } from './../../../../app/components/template/produto/venda.model';
import { User, Vendedor } from './../../../../app/components/security/user.model';
import { VendaService } from './../../../../app/components/template/produto/venda.service';
import {LoginService} from './../../../../app/components/security/login.service'
import { NgxDropzoneModule } from 'ngx-dropzone';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer,SafeHtml } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-order-pay-in-cadastro',
  templateUrl: './order-pay-in-cadastro.component.html',
  styleUrls: ['./order-pay-in-cadastro.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderPayInCadastroComponent implements OnInit {

  constructor(private authenticationService: LoginService,
              private router: Router,
              private http: HttpClient,
              private vendaService: VendaService,
              private snackBar: MatSnackBar,
              private cd: ChangeDetectorRef,
              private sanitized: DomSanitizer) { }

  ambiente: number = 0;
  serie: number = 0;
  tipo: number = 0;
  token: any;

  ngOnInit(): void {

  }

  Continuar(){
    //Vai para o index
     this.ambiente = 1;
     this.serie = 1;
     this.tipo = 1;
      this.Salva();
    //this.vendaService.mensagem("Plano Pessoal Selecionado");
  }

  TesteIntermediario(){
    //Pede Numero Cartão
    this.ambiente = 2;
     this.serie = 1;
     this.tipo = 2;
     this.Salva();
  }

  TesteSuperior(){
    //Pede Cartão
    this.ambiente = 3;
     this.serie = 1;
     this.tipo = 3;
    this.Salva();
  }

  Salva(){

this.token = localStorage.getItem('this.TOKEN_SESSION_ATTRIBUTE');
console.log('Token: ' + this.token);
        
    //Verifica se está logado
                if(this.authenticationService.isUserLoggedIn()){
                    //Pega email do usuario logado
                    let email = this.authenticationService.getLoggedInUserName();
                        //Pega usuario pelo email
                        this.authenticationService.getByEmail(email).subscribe((resposta: User) => {

                         
                             this.authenticationService.getVendedorById(resposta.id, this.token).subscribe((resposta: Vendedor) => {

                               console.log(resposta);
                               resposta.ambiente = this.ambiente; //Free
                               resposta.serie =  this.serie;

                                        this.authenticationService.updateVVendedor(resposta.id, resposta, this.token).subscribe((resposta1: Vendedor) => {

                                              console.log(resposta1);
                                              this.vendaService.mensagem("Plano Selecionado Com Sucesso");
                                              if(this.tipo == 1){

                                                  this.router.navigate(['/index']);
                                              }if(this.tipo == 2){
                                                
                                                   this.router.navigate(['/cadastrar/payment/cart']);
                                              }if(this.tipo == 3){
                                                
                                                  this.router.navigate(['/cadastrar/payment/cart']);
                                              }

                                               }, () => {
                                                   console.log("Erro ao Salvar Plano!");
                                                 }); 

                                
                                  }, () => {
                                   console.log("Erro ao Carregar Usuario!");
                                 }); 

                             
               
                        }, () => {
                           this.vendaService.mensagem("Erro ao Carregar Usuario! Por Favor Faça o Login e Tente Novamente");
                         }); 
               };  
  }

}
