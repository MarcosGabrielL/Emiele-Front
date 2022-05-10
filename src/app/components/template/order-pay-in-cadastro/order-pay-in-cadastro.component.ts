import {Component, OnInit, ChangeDetectorRef, ViewEncapsulation, NgModule, Inject} from '@angular/core';
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
import { CommonModule, DOCUMENT } from "@angular/common";
import {PerfilpagamentoService} from './../../../../app/components/template/perfilpagamento.service';
import { Perfil, PreferenceItem, NewPreferenceDTO, Root, RootDTO } from './../../../../app/components/template/perfilpagamento.model';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-pay-in-cadastro',
  templateUrl: './order-pay-in-cadastro.component.html',
  styleUrls: ['./order-pay-in-cadastro.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderPayInCadastroComponent implements OnInit {

  acessToken: String = environment.accessToken;

  constructor(@Inject(DOCUMENT) private document: Document,
              private authenticationService: LoginService,
              private router: Router,
              private http: HttpClient,
              private vendaService: VendaService,
              private snackBar: MatSnackBar,
              private cd: ChangeDetectorRef,
              private sanitized: DomSanitizer,
              private PerfilpagamentoService: PerfilpagamentoService) { }

  ambiente: number = 0;
  serie: number = 0;
  tipo: number = 0;
  token: any;
  price: number = 0;

  preference: NewPreferenceDTO = { 
    "accessToken": "",
    "items": []
  }

  preferenceitem: PreferenceItem = {
     "name": "",
     "quantity": 0,
     "price": 0,
}

root: Root;
rootdto: RootDTO;
vendedor_id: String = "";


   preferenceitens: PreferenceItem[] = [];

  ngOnInit(): void {


  }

  Continuar(){
    //Vai para o index
     this.ambiente = 1;
     this.serie = 1;
     this.tipo = 1;
     this.price = 0;
      this.Salva();
    //this.vendaService.mensagem("Plano Pessoal Selecionado");
  }

  TesteIntermediario(){
    //Pede Numero Cartão
    this.ambiente = 2;
     this.serie = 1;
     this.tipo = 2;
     this.price = 150;
     this.Salva();
  }

  TesteSuperior(){
    //Pede Cartão
    this.ambiente = 3;
     this.serie = 1;
     this.tipo = 3;
     this.price = 260;
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

                              // console.log(resposta);
                               resposta.ambiente = this.ambiente; //Free
                               resposta.serie =  this.serie;
                               this.vendedor_id = resposta.id;

                                        this.authenticationService.updateVVendedor(resposta.id, resposta, this.token).subscribe((resposta1: Vendedor) => {

                                              console.log(resposta1);
                                              this.vendaService.mensagem("Plano Selecionado Com Sucesso");

                                              this.getPagamento();
                                             

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


  getPagamento(){


    this.preferenceitem = {
       "name": "Plano",
     "quantity": 1,
     "price": this.price,
    }

    this.preferenceitens.push(this.preferenceitem);

 this.preference =  { 
    "accessToken": this.acessToken,
    "items": this.preferenceitens
  }

  //console.log(this.preference);

      this.PerfilpagamentoService.createPreference(this.preference).subscribe((resposta: any) => {

                  this.root = JSON.parse(resposta);

                  this.rootdto = {
                    "items":JSON.stringify(this.root.items),
           "payer": JSON.stringify(this.root.payer),
           "paymentMethods": JSON.stringify(this.root.paymentMethods),
           "shipments": JSON.stringify(this.root.shipments),
           "backUrls": JSON.stringify(this.root.backUrls),
           "id": this.root.id,
           "initPoint": this.root.initPoint,
           "sandboxInitPoint": this.root.sandboxInitPoint,
           "dateCreated": this.root.dateCreated,
           "operationType": this.root.operationType,
           "metadata": JSON.stringify(this.root.metadata),
           "additionalInfo": this.root.additionalInfo,
           "externalReference": this.root.externalReference,
           "expires": this.root.expires,
           "collectorId": this.root.collectorId,
           "clientId": this.root.clientId,
           "marketplace": this.root.marketplace,
           "marketplaceFee": this.root.marketplaceFee,
           "binaryMode": this.root.binaryMode,
           "vendedor_id": this.vendedor_id

                  }
                  
                   this.PerfilpagamentoService.savePreference(this.rootdto, this.token ).subscribe((resposta: RootDTO) => {

                        if(this.tipo == 1){
                          //this.router.navigate(['/index']);
                          this.router.navigate(['/cadastrar/payment/cart']);
                       }if(this.tipo == 2){
                          //this.router.navigate(['/cadastrar/payment/cart']);
                          window.open(''+this.root.initPoint, '_blank');
                          //this.document.location.href = ''+ resposta.sandboxInitPoint;
                       }if(this.tipo == 3){               
                          //this.router.navigate(['/cadastrar/payment/cart']);
                           window.open(''+this.root.initPoint, '_blank');
                          //this.document.location.href = '' +resposta.sandboxInitPoint;
                       }
                  
                  }, () => {
                                   console.log("Erro ao Salvar Preferencias de Pago!");
                                 }); 

                   

       }, () => {
             console.log("Erro ao Criar Pago!");
             }); 


                                             
  }

}
