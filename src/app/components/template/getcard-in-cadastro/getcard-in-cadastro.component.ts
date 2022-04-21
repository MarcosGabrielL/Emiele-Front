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
import { User } from './../../../../app/components/security/user.model';
import { VendaService } from './../../../../app/components/template/produto/venda.service';

import { PerfilpagamentoService } from './../../../../app/components/template/perfilpagamento.service';
import { Perfil } from './../../../../app/components/template/perfilpagamento.model';
import {LoginService} from './../../../../app/components/security/login.service'
import { NgxDropzoneModule } from 'ngx-dropzone';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer,SafeHtml } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-getcard-in-cadastro',
  templateUrl: './getcard-in-cadastro.component.html',
  styleUrls: ['../../../../app/app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GetcardInCadastroComponent implements OnInit {

  constructor(private authenticationService: LoginService,
              private router: Router,
              private http: HttpClient,
              private vendaService: VendaService,
              private snackBar: MatSnackBar,
              private cd: ChangeDetectorRef,
              private sanitized: DomSanitizer,
              private PerfilpagamentoService: PerfilpagamentoService) { }

  vendedor_id: String = "";
  successMessage: string = "";
  errorMessage: string = "";
  token: any;

  banco: string = "";
  tipoconta: string = "";
  numeroconta: string = "";
  agencia: string = "";
  nomecompleto: string = "";
  cpf: string = "";

  numeroCartao1: string = "";
  numeroCartao2: string = "";
  numeroCartao3: string = "";
  numeroCartao4: string = "";
  titular: string = "";
  mesvencimento: string = "";
  anovencimento: string = "";
  cvv: string = "";
  email: String = "";

  perfil: Perfil = {
    "id":"", 
    "email":"", 
    "password":"", 
    "firstName":"", 
    "lastName":"", 
    "banco":"", 
  "tipoconta":"", 
  "numeroconta":"", 
  "agencia":"", 
  "nomecompleto":"", 
  "cpf":"", 

  "numeroCartao1":"", 
  "numeroCartao2":"", 
  "numeroCartao3":"", 
  "numeroCartao4":"", 
  "titular":"", 
  "mesvencimento":"", 
  "anovencimento":"", 
  "cvv":"" 
  }

  ngOnInit(): void {

    this.isLoggedin();
  }


  isLoggedin(){

        this.token = localStorage.getItem('this.TOKEN_SESSION_ATTRIBUTE');
    //Verifica se está logado
                if(this.authenticationService.isUserLoggedIn()){
                    //Pega email do usuario logado
                    this.email = this.authenticationService.getLoggedInUserName();
                        //Pega usuario pelo email
                        this.authenticationService.getByEmail(this.email).subscribe((resposta: User) => {

                         

                            this.vendedor_id  = resposta.id.toString();
                              console.log( this.vendedor_id);

                               

                              
               
            }, () => {
               this.vendaService.mensagem("Erro ao Carregar Usuario! Por Favor Faça o Login e Tente Novamente");
             }); 
               };  
  }

  salvaperfil(){

    
  this.perfil = {
    "id":this.vendedor_id, 
    "email":this.email, 
    "password":"", 
    "firstName":"", 
    "lastName":"", 
    "banco":this.banco, 
  "tipoconta":this.tipoconta, 
  "numeroconta":this.numeroconta, 
  "agencia":this.agencia, 
  "nomecompleto":this.nomecompleto, 
  "cpf":this.cpf, 

  "numeroCartao1":this.numeroCartao1, 
  "numeroCartao2":this.numeroCartao2, 
  "numeroCartao3":this.numeroCartao3, 
  "numeroCartao4":this.numeroCartao4, 
  "titular":this.titular, 
  "mesvencimento":this.mesvencimento, 
  "anovencimento":this.anovencimento, 
  "cvv":this.cvv 
  }

    this.PerfilpagamentoService.Save(this.perfil, this.token).subscribe((resposta: Perfil) => {

                console.log(resposta);
                this.PerfilpagamentoService.mensagem("Perfil Bancario Salvo com Sucesso");
                 this.router.navigate(['/index']);

       }, () => {
               this.PerfilpagamentoService.mensagem("Erro ao Salvar Perfil Bancario");
             }); 
               
  }

}
