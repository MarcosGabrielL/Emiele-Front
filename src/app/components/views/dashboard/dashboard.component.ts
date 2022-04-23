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


import {PerfilpagamentoService} from './../../../../app/components/template/perfilpagamento.service';
import { Perfil, PreferenceItem, NewPreferenceDTO, Root, RootDTO } from './../../../../app/components/template/perfilpagamento.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../../app/app.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DashboardComponent implements OnInit {

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

  vendas: Venda[]= [];
  produtos: Produto[]= [];
  eventos: Evento[] = [];
  tem0:boolean= false;
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
  Notification: Notification[]= [];
  mostraprodutos: boolean = false;
  status: any;

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

  CarregaDadosGerais(){

    this.vendaService.findTotalToday(this.vendedor_id, this.token).subscribe((result: ResponseVendas)=> {
                                  //this.successMessage = 'Produto Salvo com sucesso!';
                                  //this.vendaService.mensagem(this.successMessage); 

                                  this.vendidohoje = result.total;
                                   this.percenthoje = result.percentual;

                              }, () => {
                                this.errorMessage = 'Error ao Salvar produto';
                                      this.vendaService.mensagem(this.errorMessage);
                                  
                               }); 


  }

  CarregaltimasVendas(){

    this.vendaService.findAllByDataSaida(this.vendedor_id, this.token).subscribe((result: Venda[])=> {
                                 // this.successMessage = 'Produto Salvo com sucesso!';
                                  //this.vendaService.mensagem(this.successMessage); 

                                    this.vendas = result;
                                    console.log(this.vendas);
                                    console.log(this.vendedor_id);
                                    console.log(this.token);

                                   // this.preenchevendashoje();

                                  

                              }, () => {
                                this.errorMessage = 'Error ao Salvar produto';
                                      this.vendaService.mensagem(this.errorMessage);
                                  
                               }); 

  }

  CarregaFaturamento(){

     this.vendaService.findEventos(this.vendedor_id, this.token).subscribe((result: Evento[])=> {
                                  //this.successMessage = 'Produto Salvo com sucesso!';
                                  //this.vendaService.mensagem(this.successMessage); 

                                 
                                 this.eventos=result;
                                    
                                 this.eventos.forEach( (evento: Evento) => {
                                          
                                        if(this.cont == 0){this.tem0 = true}
                                          if(this.cont == 1){this.tem1 = true}
                                            if(this.cont == 2){this.tem2 = true}
                                              if(this.cont == 3){this.tem3 = true}
                                                if(this.cont == 4){this.tem4 = true}
                                                  if(this.cont == 5){this.tem5 = true}
                                       console.log(evento);
                                       this.cont=this.cont+1;
                                   });

                              }, () => {
                                this.errorMessage = 'Error ao Salvar produto';
                                      this.vendaService.mensagem(this.errorMessage);
                                  
                               }); 

  }

  CarregaGraficos(){

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

                              this.CarregaDadosGerais();
                              this.CarregaltimasVendas();
                              this.CarregaFaturamento();
                              this.CarregaGraficos();
               
            }, () => {
               this.vendaService.mensagem("Erro ao Carregar Usuario! Por Favor Faça o Login e Tente Novamente");
             }); 
               };  


               //Vê se foi pago
               
                  this.status = this?.route.snapshot.paramMap.get("resultpag") || "";
                  console.log(this.status); // price
                

               if(this?.status === "approved"){
                  this.PerfilpagamentoService.mensagemsucess("Pagamento Aprovado! Aproveite");
               }
               if(this?.status === "in_process"){
                   this.PerfilpagamentoService.mensagem("Pagamento Em Processo! Até Lá desfrute do plano Gratis!");
               }
               if(this?.status === "rejected"){
                   this.PerfilpagamentoService.mensagemerro("Pagamento Rejeitado! Efetue um novo pagamento ou desfrute do plano Gratis");
               }
              
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


  

}
