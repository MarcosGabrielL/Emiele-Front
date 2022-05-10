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
import { DomSanitizer,SafeHtml, SafeUrl} from '@angular/platform-browser';
import { CommonModule } from "@angular/common";

import { environment } from 'src/environments/environment';


import {PerfilpagamentoService} from './../../../../app/components/template/perfilpagamento.service';
import { Perfil, PreferenceItem, NewPreferenceDTO, Root, RootDTO, AutenticacionResponse } from './../../../../app/components/template/perfilpagamento.model';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['../../../../app/app.component.css']
})
export class BillingComponent implements OnInit {

   vendidohoje: String = "";
  percenthoje: String = "";
  vendashoje: String = "";
  percentvendashoje: String = "";
  novosclientes: String = "";
  novosclientespercent: String = "";
  ticketmedio: String = "";
  ticketmediopercent: String = "";

  htmlvendas: SafeHtml = "";

  vendedor_id: String = "1";

  vendas: Venda[];
  produtos: Produto[];
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
    lastName: "",
    tipo: ""
  }

  mostranotify: boolean;
  mostralist: boolean = false;
  mostramenu: boolean = false;
  selectedVenda: Venda;
  notfycunt: String = "";
  Notification: Notification[];
  mostraprodutos: boolean = false;

   autorizationUrl: String = environment.autorizationUrl;

     response:  AutenticacionResponse;
     status: String = "STATUS: Sem autorização";

code: any = null;
  constructor(private authenticationService: LoginService,
              private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private vendaService: VendaService,
              private snackBar: MatSnackBar,
              private cd: ChangeDetectorRef,
              private sanitized: DomSanitizer,
              private PerfilpagamentoService: PerfilpagamentoService) { }

  ngOnInit(): void {

       this.isLoggedin();
    this.mostranotify = this.vendaService.mostranotify;
             
  }


  SafeUrl(): SafeUrl{

     return this.sanitized.bypassSecurityTrustUrl('https://auth.mercadopago.com/authorization?client_id=3843631125520319&response_type=code&platform_id=mp&state='+this.vendedor_id+'&redirect_uri=https://emiele-service-gerenciador.herokuapp.com/generic/oauth');

}

Url(): String{
   return 'https://auth.mercadopago.com/authorization?client_id=3843631125520319&response_type=code&platform_id=mp&state='+this.vendedor_id+'&redirect_uri=https://emiele-service-vendas.herokuapp.com/generic/oauth';

}

isLoggedin(){

        this.token = localStorage.getItem('this.TOKEN_SESSION_ATTRIBUTE');
    //Verifica se está logado
                if(this.authenticationService.isUserLoggedIn()){
                    //Pega email do usuario logado
                    let email = this.authenticationService.getLoggedInUserName();
                        //Pega usuario pelo email
                        console.log('Email: '+email);
                        this.authenticationService.getByEmail(email).subscribe((resposta: User) => {

                         console.log(resposta);

                            this.vendedor_id  = resposta.id.toString();
                              console.log( this.vendedor_id);

                               this.vendaService.userNotification(this.vendedor_id).subscribe((result: Notification[])=> {
                                 // this.successMessage = 'Produto Salvo com sucesso!';
                                  //this.vendaService.mensagem(this.successMessage); 

                                    console.log('Notification: '+result);
                                    this.Notification = result;

                                     



                                    if(result == null){
                                        this.vendaService.mostranotify = false;
                                       this.mostranotify = this.vendaService.mostranotify;
                                    }else{
                                       this.vendaService.mostranotify = true;
                                       this.mostranotify = this.vendaService.mostranotify;
                                    }
                                   
                                      this.notfycunt = result.length.toString();
                                  

                              }, () => {
                              console.log('Error ao Buscar Notifications');
                                   //   this.vendaService.mensagem(this.errorMessage);
                                  
                               });

                                this.getNotifications();

                              this.CarregaDadosPerfilPagamento();
                              this.CarregaNotasFiscais();
                              this.CarregaTransações();
                              this.CarregaProvedoresPagamento();
                              
               
            }, () => {
               this.vendaService.mensagem("Erro ao Carregar Usuario! Por Favor Faça o Login e Tente Novamente");
             }); 
               };  


               
              
  }


  async getNotifications(){


    while(true){
    console.log(this.cont1);
    this.cont1 = this.cont1 +1;
    await this.wait(30000);
  }

 }

  wait(ms: number)  {
    return new Promise((resolve)=> {

      this.vendaService.userNotification(this.vendedor_id).subscribe((result: Notification[])=> {
                                 // this.successMessage = 'Produto Salvo com sucesso!';
                                  //this.vendaService.mensagem(this.successMessage); 

                                    console.log('Notification: '+result);
                                    this.Notification = result;



                                    if(result == null){
                                        this.vendaService.mostranotify = false;
                                       this.mostranotify = this.vendaService.mostranotify;
                                    }else{
                                       this.vendaService.mostranotify = true;
                                       this.mostranotify = this.vendaService.mostranotify;
                                    }
                                   
                                      this.notfycunt = result.length.toString();
                                  

                              }, () => {
                              console.log('Error ao Buscar Notifications');
                                   //   this.vendaService.mensagem(this.errorMessage);
                                  
                               });

      setTimeout(resolve, ms);
    });
  }

   mostranotification(){
    if(!this.mostralist){ this.mostralist = true; this.mostramenu = false; }else{ this.mostralist = false;  }


       this.Notification.forEach( (notify: Notification) => {
           // if(notify.level === "1"){
               this.vendaService.AtualizaNotification(notify, this.vendedor_id).subscribe((result: Notification)=> {
                             console.log('Notifications Atualizadas com Sucesso');

                }, () => {
                                        console.log('Error ao Atualizar Notifications');
                                             //   this.vendaService.mensagem(this.errorMessage);
                                            
                                         });
       //  }

     });
    
  }

  mostramenulist(){
    if(!this.mostramenu){ this.mostramenu = true;this.mostralist = false;}else{ this.mostramenu = false; }
    
  }


  CarregaDadosPerfilPagamento(){


  }


  CarregaNotasFiscais(){

  }

  CarregaTransações(){

  }

  CarregaProvedoresPagamento(){

     this.PerfilpagamentoService.getCredenciais(this.vendedor_id, this.token).subscribe((result: AutenticacionResponse)=> {

           this.response = result;
           console.log(this.response);

           if(this.response != null){
            this.status = "STATUS:     Autorizado";
           }

                }, () => {
                                        console.log('Error ao Buscar Credenciais Provedores');
                                             //   this.vendaService.mensagem(this.errorMessage);
                                            
                                         });
       //  }
  }

}
