import {Component, OnInit, ChangeDetectorRef, ViewEncapsulation, NgModule} from '@angular/core';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {tap, map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Produto } from './../../../../app/components/template/produto/produto.model';
import { Venda, Evento,Frete } from './../../../../app/components/template/produto/venda.model';
import { ResponseVendas } from './../../../../app/components/template/produto/venda.model';
import { Vendido, Tem, Notification } from './../../../../app/components/template/produto/venda.model';
import { User,Vendedor } from './../../../../app/components/security/user.model';
import { VendaService } from './../../../../app/components/template/produto/venda.service';

import {FileService} from './../../../../app/components/template/produto/file.service';
import {FileDB} from './../../../../app/components/template/produto/file.model'


import {LoginService} from './../../../../app/components/security/login.service'
import { NgxDropzoneModule } from 'ngx-dropzone';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer,SafeHtml,SafeUrl } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../../../app/app.component.css']
})
export class ProfileComponent implements OnInit {

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
files: File[] = [];

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

  usuario: User= {
     id: 0,
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    tipo: ""
  }

  vendedor: Vendedor = {
    id: "",
     nomefantasia: "", 
    descricao: "",
    rua: "",
    telefone: "",
    email: "",
    ambiente: 0,
    serie: 0,
    datainicio: "",
    datafim: ""
  }

  frete: Frete = {
    id: "",
     
   fretefixo: "",
   frete10k: "",
    cobrafrete: false,
   vendedorid: ""
  }

  mostranotify: boolean = false;
  mostralist: boolean = false;
  mostramenu: boolean = false;
  selectedVenda: Venda;
  notfycunt: String = "";
  Notification: Notification[];
  mostraprodutos: boolean = false;
  closeResult = '';

  image: SafeUrl = "";
  temimagem: boolean = false;
  imagemdb: FileDB;

  taxaFrete: number = 5;
  cobrafrete: boolean = true;

  constructor(private cdRef: ChangeDetectorRef,
              private authenticationService: LoginService,
              private router: Router,
              private http: HttpClient,
              private vendaService: VendaService,
              private snackBar: MatSnackBar,
              private cd: ChangeDetectorRef,
              private sanitized: DomSanitizer,
              private FileService: FileService,

    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.isLoggedin();
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
    this.files = [];
  console.log(event.addedFiles.size);
  this.files.push(...event.addedFiles);
  if(this.files[0].size >=1000000){
        this.vendaService.mensagem("Arquivo Muito Grande");
         this.files = [];
  }else{
    this.files = [];
  this.files.push(...event.addedFiles);
    }
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

   isLoggedin(){

        this.token = localStorage.getItem('this.TOKEN_SESSION_ATTRIBUTE');
    //Verifica se está logado
                if(this.authenticationService.isUserLoggedIn()){
                    //Pega email do usuario logado
                    let email = this.authenticationService.getLoggedInUserName();
                        //Pega usuario pelo email
                        this.authenticationService.getByEmail(email).subscribe((resposta: User) => {
                            this.usuario = resposta;

                            this.vendedor_id  = resposta.id.toString();
console.log( this.vendedor_id);
                              
                              this.vendaService.userNotification(this.vendedor_id).subscribe((result: Notification[])=> {
                                 // this.successMessage = 'Produto Salvo com sucesso!';
                                  //this.vendaService.mensagem(this.successMessage); 

                                    console.log('Notification: ');
                                    console.log(result);
                                    this.Notification = result;


                                    if(result.length == 0){
                                        //this.vendaService.mostranotify = false;
                                       this.mostranotify = false;
                                    }else{
                                       //this.vendaService.mostranotify = false;
                                       this.mostranotify = true;
                                    }
                                   
                                      this.notfycunt = result.length.toString();

                                      this.buscaFrete();
                                  
                                        this.getNotifications();
                              }, () => {
                              console.log('Error ao Buscar Notifications i');
                                   //   this.vendaService.mensagem(this.errorMessage);
                                  
                               });
                              
                              this.CarregaConversations();
               
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

  CarregaConversations(){

    this.files = [];

     this.authenticationService.getVendedorById(+this.vendedor_id, this.token).subscribe((resposta: Vendedor) => {


                                this.vendedor = resposta;
                                console.log('Vendedor: ');
                                console.log(this.vendedor);

                                //Busca Imagem de perfil
                                this.FileService.findByIdVendedor(this.vendedor_id, this.token).subscribe((resposta: FileDB[]) => {

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
                              console.log('Error ao Buscar Dados Loja');
                                   //   this.vendaService.mensagem(this.errorMessage);
                                  
                               });


               }, () => {
                              console.log('Error ao Buscar Dados Vendedor');
                                   //   this.vendaService.mensagem(this.errorMessage);
                                  
                               });


  }

  //Atualizar informações Loja
  Att(){

    //ATualiza DADOS
    this.authenticationService.AtualizaVendedor(this.vendedor, this.token).subscribe((resposta: Vendedor) => {

      //this.vendedor = resposta;
      console.log(resposta);
      if(this.files.length == 0){
       this.authenticationService.mensagem("Dados Atualizados Com Sucesso!");
       }
           this.AttImage();
      

      }, () => {
         this.vendaService.mensagem("Error ao Atualizar Dados Vendedor");
                              console.log('Error ao Atualizar Dados Vendedor');
                                   //   this.vendaService.mensagem(this.errorMessage);
                                  
                               });
    
  }


  AttImage(){
    

    //Atualiza Foto
    if( this.temimagem){
      //Atualiza Imagem
      this.FileService.AtualizaFotoLoja(this.files[0], this.vendedor_id, this.imagemdb.id).subscribe((event: any) => {

                                   if (event.type === HttpEventType.UploadProgress) {

                                    //Calculando Porcentagem
                                    let aqui: number = event!.total;
                                    this.authenticationService.
                                              mensagem('Salvando Imagens: '+Math.round((100 * event.loaded) / aqui) + '%...');

                                   } else if (event instanceof HttpResponse) {
                                    //UploadComplet
                                            
                                            this.modalService.dismissAll();
                                      this.CarregaConversations();
                                          }


                                   }, () => {
                              console.log('Error ao Atualizar imagem de Exibição');
                                   //   this.vendaService.mensagem(this.errorMessage);
                                  
                               });
      
    }else{
      //Salva Imagem
      this.FileService.SalvaFotoLoja(this.files[0], this.vendedor_id).subscribe((event: any) => {

                                    if (event.type === HttpEventType.UploadProgress) {

                                    //Calculando Porcentagem
                                    let aqui: number = event!.total;
                                    this.authenticationService.
                                              mensagem('Salvando Imagens: '+Math.round((100 * event.loaded) / aqui) + '%...');

                                   } else if (event instanceof HttpResponse) {
                                    //UploadComplet
                                            
                                            this.modalService.dismissAll();
                                      this.CarregaConversations();
                                          }

                                   }, () => {
                              console.log('Error ao Atualizar imagem de Exibição');
                                   //   this.vendaService.mensagem(this.errorMessage);
                                  
                               });
    }
   
    

  }

  atualizaFrete(){
     this.frete.fretefixo = this.taxaFrete.toString();
         this.frete.cobrafrete = this.cobrafrete;
         this.frete.vendedorid = this.vendedor_id;
          console.log(this.frete);

    this.vendaService.saveFreteVendedor(this.frete, "1").subscribe((result: Frete)=> {


          this.frete.id = result.id;
this.buscaFrete();
         

          
         

      }, () => {
                                   console.log("Erro ao Salvar frete!");
                                 }); 
    
  }

  buscaFrete(){
    this.vendaService.getFreteVendedor(this.vendedor_id, "1").subscribe((result: Frete)=> {

                  this.frete = result;


                 }, () => {
                                                   console.log("Erro ao Carregar frete!");
                                                 }); 
  }


}
