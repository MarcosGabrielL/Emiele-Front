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
              private sanitized: DomSanitizer) { }

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

  ngOnInit(): void {
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

                               

                              
               
            }, () => {
               this.vendaService.mensagem("Erro ao Carregar Usuario! Por Favor Faça o Login e Tente Novamente");
             }); 
               };  
  }

}
