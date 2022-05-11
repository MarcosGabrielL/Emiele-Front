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
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['../../../../app/app.component.css']
})
export class TableComponent implements OnInit {

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
  dispachar: String = "Despachar para Entrega";
  dispachou: boolean = false;

  constructor(private cdRef: ChangeDetectorRef,private authenticationService: LoginService,
              private router: Router,
              private http: HttpClient,
              private vendaService: VendaService,
              private snackBar: MatSnackBar,
              private cd: ChangeDetectorRef,
              private sanitized: DomSanitizer) { }

  ngOnInit(): void {

     this.isLoggedin();
    this.mostranotify = this.vendaService.mostranotify;

    


    
  }

  wait(ms: number)  {
    return new Promise((resolve)=> {

      this.vendaService.userNotification(this.vendedor_id).subscribe((result: Notification[])=> {
                                 // this.successMessage = 'Produto Salvo com sucesso!';
                                  //this.vendaService.mensagem(this.successMessage); 

                                    this.Notification = [];

                                    console.log('Notification: '+result);
                                    result.forEach( (notify: Notification) => {
                                      if(notify.isRead == false){
                                        this.Notification.push(notify);
                                      }
                                     });


                                    if(result == null  ||  this.Notification.length == 0){
                                        this.vendaService.mostranotify = false;
                                       this.mostranotify = this.vendaService.mostranotify;
                                    }else{
                                       this.vendaService.mostranotify = true;
                                       this.mostranotify = this.vendaService.mostranotify;
                                    }
                                   
                                      this.notfycunt = this.Notification.length.toString();
                                  
                                  

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


            notify.isRead = true;

               this.vendaService.SalvaNotification(notify).subscribe((result: Notification)=> {
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

  async getNotifications(){


    while(true){
    console.log(this.cont1);
    this.cont1 = this.cont1 +1;
    await this.wait(30000);
  }

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
                                  
                                        this.getNotifications();
                              }, () => {
                              console.log('Error ao Buscar Notifications i');
                                   //   this.vendaService.mensagem(this.errorMessage);
                                  
                               });
                              this.CarregaltimasVendas();
               
            }, () => {
               this.vendaService.mensagem("Erro ao Carregar Usuario! Por Favor Faça o Login e Tente Novamente");
             }); 
               };  
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

  getVendidos(id: any){

    console.log(id);

     this.vendaService.findAllVendidosByIdVenda(id, this.token).subscribe((result: Produto[])=> {
                                 // this.successMessage = 'Produto Salvo com sucesso!';
                                  //this.vendaService.mensagem(this.successMessage); 

                                   
                                    this.mostraprodutos= true;
                                     this.produtos = result;
                                     this.cdRef.detectChanges();

                                    console.log("Produtos:" +JSON.stringify(this.produtos));
                                    

                                   // this.preenchevendashoje();

                                  

                              }, () => {
                                this.errorMessage = 'Error ao Buscar Produtos';
                                      this.vendaService.mensagem(this.errorMessage);
                                  
                               });  

       this.vendaService.getVendaById(id, this.token).subscribe((result: Venda)=> {
                                 // this.successMessage = 'Produto Salvo com sucesso!';
                                  //this.vendaService.mensagem(this.successMessage); 

                                    this.selectedVenda = result;



                                    if(this.selectedVenda.modopagamento3 === "4"){
                                      this.dispachar = "Em Caminho";
                                      this.dispachou = true;
                                      console.log("MODOPAGAMENTO 3: "+this.selectedVenda.modopagamento3);
                                    }else{
                                      this.dispachou = false;
                                      this.dispachar = "Despachar para Entrega";
                                    }

                                    console.log("Produtos:" +JSON.stringify(this.selectedVenda));
                                    
                                   // Get informations of client
                                   this.authenticationService.getById(this.selectedVenda.comprador_id).subscribe((resposta: User) => {
                                          this.comprador = resposta;

                                          console.log("Comprador: "+this.comprador);

                                    }, () => {
                                              this.errorMessage = 'Cliente não registrado';
                                                    this.vendaService.mensagem(this.errorMessage);
                                                
                                             }); 
                                  

                              }, () => {
                                this.errorMessage = 'Error ao Salvar produto';
                                      this.vendaService.mensagem(this.errorMessage);
                                  
                               });  
  }

  getStatus(status: any): String{
    /*1-Carrinho
    0 - pedido
    2-Pago
    3-Pronto
    4-Despachado
    5-Em Caminho
    6-Entregue
    7-Cancelado
    8-Extraviado
    9-Danificado*/
    let result: String = "";

      if(status === "0"){
        result = "Pedido";
      }
      if(status === "1"){
        result = "Carrinho";
      }
      if(status === "2"){
        result = "Pago";
      }
      if(status === "3"){
        result = "Pronto";
      }
      if(status === "4"){
        result = "Despachado";
      }
      if(status === "5"){
        result = "Em Caminho";
      }
      if(status === "6"){
        result = "Entregue";
      }
      if(status === "7"){
        result = "Cancelado";
      }

      return result;

  }


Despachar(){
  //Muda Status venda para Em Caminho
      if(!this.dispachou){
                console.log(this.selectedVenda);
                this.selectedVenda.modopagamento3 = "4";

               this.vendaService.attVendas("this.token", this.selectedVenda).subscribe((result: Venda)=> {

                        this.router.navigateByUrl('/att', { skipLocationChange: true }).then(() => {
                      this.router.navigate(['/tables']); // navigate to same route
                  }); 



                   }, () => {
                                              this.errorMessage = 'Error ao Atualizar Venda';
                                                    this.vendaService.mensagem(this.errorMessage);
                                                
                                             });
         }  
}

}
