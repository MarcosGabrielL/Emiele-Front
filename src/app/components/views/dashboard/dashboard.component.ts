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

  vendas: Venda[];
  eventos: Evento[];
  tem0:boolean= true;
  tem1:boolean= false;
  tem2:boolean= false;
  tem3:boolean= false;
  tem4:boolean= false;
  tem5:boolean= false;
  cont: number = 0;
   cont1: number = 0;


  successMessage: string = "";
  errorMessage: string = "";
  token: any;

  mostranotify: boolean;
  mostralist: boolean = false;
  notfycunt: String = "";
  Notification: Notification[];

  constructor(private authenticationService: LoginService,
              private router: Router,
              private http: HttpClient,
              private vendaService: VendaService,
              private snackBar: MatSnackBar,
              private cd: ChangeDetectorRef,
              private sanitized: DomSanitizer) { }

  ngOnInit(): void {

    this.isLoggedin();
    this.mostranotify = this.vendaService.mostranotify;
    this.getNotifications();
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

                                    this.preenchevendashoje();

                                  

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
                              this.CarregaDadosGerais();
                              this.CarregaltimasVendas();
                              this.CarregaFaturamento();
                              this.CarregaGraficos();
               
            }, () => {
               this.vendaService.mensagem("Erro ao Carregar Usuario! Por Favor Faça o Login e Tente Novamente");
             }); 
               };  
  }


preenchevendashoje(){


this.htmlvendas = this.sanitized.bypassSecurityTrustHtml(

  " <tr>"+
   "                   <td>"+
    "                    <div class='d-flex px-2 py-1'>"+
     "                     <div>"+
      "                      <img src='../assets/img/small-logos/logo-xd.svg' class='avatar avatar-sm me-3' alt='xd'>"+
       "                   </div>"+
        "                  <div class='d-flex flex-column justify-content-center'>"+
         "                   <h6 class='mb-0 text-sm'>"+this.vendas[0].valor+"</h6>"+
         "                 </div>"+
         "               </div>"+
         "             </td>"+
         "             <td>"+
         "               <div class='avatar-group mt-2'>"+
         "                 <a href='javascript:;' class='avatar avatar-xs rounded-circle' data-bs-toggle='tooltip' data-bs-placement='bottom' title='Ryan Tompson'>"+
         "                   <img src='../assets/img/team-1.jpg' alt='team1'>"+
         "                 </a>"+
         "                 <a href='javascript:;' class='avatar avatar-xs rounded-circle' data-bs-toggle='tooltip' data-bs-placement='bottom' title='Romina Hadid'>"+
         "                   <img src='../assets/img/team-2.jpg' alt='team2'>"+
         "                 </a>"+
         "                 <a href='javascript:;' class='avatar avatar-xs rounded-circle' data-bs-toggle='tooltip' data-bs-placement='bottom' title='Alexander Smith'>"+
         "                   <img src='../assets/img/team-3.jpg' alt='team3'>"+
         "                 </a>"+
         "                 <a href='javascript:;' class='avatar avatar-xs rounded-circle' data-bs-toggle='tooltip' data-bs-placement='bottom' title='Jessica Doe'>"+
         "                   <img src='../assets/img/team-4.jpg' alt='team4'>"+
         "                 </a>"+
         "               </div>"+
         "             </td>"+
         "             <td class='align-middle text-center text-sm'>"+
         "               <span class='text-xs font-weight-bold'> R$14,000 </span>"+
         "             </td>"+
         "             <td class='align-middle'>"+
         "               <div class='progress-wrapper w-75 mx-auto'>"+
         "                 <div class='progress-info'>"+
         "                   <div class='progress-percentage'>"+
         "                     <span class='text-xs font-weight-bold'>60%</span>"+
         "                   </div>"+
         "                 </div>"+
         "                 <div class='progress'>"+
         "                   <div class='progress-bar bg-gradient-info w-60' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100'></div>"+
         "                 </div>"+
         "               </div>"+
         "             </td>"+
         "           </tr>");
//console.log(this.htmlvendas);
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
    if(!this.mostralist){
      this.mostralist = true;
     
    }else{
      this.mostralist = false;
    }
  }


  

}
