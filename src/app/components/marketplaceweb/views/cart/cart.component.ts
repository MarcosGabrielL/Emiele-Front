import { Component, OnInit } from '@angular/core';

import { DomSanitizer,SafeHtml,SafeUrl } from '@angular/platform-browser';

import { Produto,ProdutoDTO } from './../../../../../app/components/template/produto/produto.model';
import { User,Vendedor } from './../../../../../app/components/security/user.model';
import { VendaService } from './../../../../../app/components/template/produto/venda.service';
import { Venda,RequestWrapper } from './../../../../../app/components/template/produto/venda.model';
import {LoginService} from './../../../../../app/components/security/login.service'


import {PerfilpagamentoService} from './../../../../../app/components/template/perfilpagamento.service';
import { Perfil, PreferenceItem, NewPreferenceDTO, Root, RootDTO, AutenticacionResponse } from './../../../../../app/components/template/perfilpagamento.model';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private sanitized: DomSanitizer,
              private VendaService: VendaService,
              private router: Router,
              private route: ActivatedRoute,
              private PerfilpagamentoService: PerfilpagamentoService,
              private authenticationService: LoginService) { }

  produtos: ProdutoDTO[] = [];
  vendedor: Vendedor;
  subtotal: number = 0;
  tax: number = 0;
  frete: number = 0;
  total: number = 0;
  entregar: boolean = false;
  venda: Venda = {
     "id": "",
    "diavenda": "", 
    "idvendas": 0,
    "caixa": "",
    "loja": "",
    "datavenda": "",
    "datacancelamento": "",
    "valor": "",
    "recebido1": 0, 
    "recebido2": 0, 
    "recebido3": 0,   
    "troco": "",
    "modopagamento1": "",
    "modopagamento2": "",
    "modopagamento3": "",
    "vendedor_id": "",
    "comprador_id": "",
    "status": "",
  }

  request: RequestWrapper = {
    "produtos": [],
    "vendas": this.venda
  }

  preference: NewPreferenceDTO = { 
    "accessToken": "",
    "items": []
  }

  preferenceitem: PreferenceItem = {
     "name": "",
     "quantity": 0,
     "price": 0,
}

preferenceitens: PreferenceItem[]=[];


comprador_id: String = "";

root: Root;
rootdto: RootDTO;
vendedor_id: String = "";
access_token: String = "";
logado: boolean = false;
 token: any;

  ngOnInit(): void {


    //Verifica se ta logado
        this.isLoggedin();

    
  }

  SafeUrl(data: any): SafeUrl{

    return this.sanitized.bypassSecurityTrustUrl('data:image/png;base64,'+data);                                           

}

entrega(){
  if(this.entregar){
      this.frete = 5;
  }else{
    this.frete = 0;
  }
}

criaVenda(){

  //Cria Preferencia de Pago com AccesToken Vendedor
  //Criar Checkout com itens e porcentagem se Plano de vendedor = gratis
  this.getPagamento();
  
 }




 getPagamento(){


    

    this.produtos.forEach( (evento: ProdutoDTO) => { 

        this.preferenceitem = {
         "name": evento.codigo,
         "quantity": +evento.quantidade,
         "price": +evento.SubTotal,
        }

        this.preferenceitens.push(this.preferenceitem); 

     });

     

  //console.log(this.preference);


    this.venda.valor= "" + this.subtotal;
  this.venda.datavenda= "" +new Date;
  this.venda.recebido1 = this.total;
  this.venda.modopagamento1= "1";
  this.venda.vendedor_id= this.produtos[0].vendedor_id;
  this.venda.comprador_id = this.comprador_id;

  this.request.vendas = this.venda;
  this.request.produtos = this.produtos;

   console.log(this.request);


  this.token = localStorage.getItem('this.TOKEN_SESSION_ATTRIBUTE')!;


   this.VendaService.addVendas(this.request, this.token).subscribe((result: Venda)=> {

    this.venda = result;
    //console.log(this.venda);

        this.PerfilpagamentoService.getCredenciais(this.venda.vendedor_id, this.token).subscribe((result: AutenticacionResponse)=> {
    
      this.access_token = result.access_token;
           console.log(result.access_token);

            this.preference =  { 
        "accessToken": this.access_token,
        "items": this.preferenceitens
      }
      console.log(this.preference);




                         this.PerfilpagamentoService.createPreferenceVendedor(this.preference, this.venda.id).subscribe((resposta: any) => {

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
                   "vendedor_id": this.produtos[0].vendedor_id

                  }
                  
                   this.PerfilpagamentoService.savePreference(this.rootdto, this.token ).subscribe((resposta: RootDTO) => {



                      //Cria Venda com caracteristicas

                      this.VendaService.mensagem('Pedido Efetuado com sucesso!');
                       sessionStorage.setItem('Produtos', JSON.stringify([]));
                       sessionStorage.setItem('Vendedor', JSON.stringify({}));
                       sessionStorage.setItem('Pedidos', JSON.stringify(this.request));

                        //Retorna Mensagem de Pago OU Negado
                       //Redireciona para Lista de Pedidos com Status (Pedido, PAgo, Entregue, Cancelado... etc)
                       window.open(''+this.root.sandboxInitPoint, '_blank');
                         
                      
                  }, () => {
                                   console.log("Erro ao Salvar Preferencias de Pago!");
                                 }); 

                   

       }, () => {
             console.log("Erro ao Criar Pago!");
             }); 











                }, () => {
                                        console.log('Error ao Buscar Credenciais de Pago do vendedor');
                                         });




    }, () => {
                                    
            this.VendaService.mensagem('Erro ao Efetuar Pedido!');
         });
  
                                        
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

                            this.comprador_id  = resposta.id.toString();
                              console.log( this.comprador_id);
                              
                               //Verifica se é cliente
                               console.log('Logago')
                                    this.logado = true;


                                    //Carrega Carrinho

                                    this.produtos = JSON?.parse(sessionStorage?.getItem('Produtos') || "") || [] ;

                                    this.produtos?.forEach( (evento: ProdutoDTO) => { 
                                        this.subtotal = this.subtotal + evento.SubTotal;
                                         this.total = this.subtotal;                                           
                                     });
                                    
                                    this.vendedor = JSON.parse(sessionStorage.getItem('Vendedor')!);
                                    

                                    console.log(this.produtos);
                             
                               
               
            }, () => {
              // this.vendaService.mensagem("Erro ao Carregar Usuario! Por Favor Faça o Login ou cadastre um email");
                    console.log('Não Logado')
                           //Se não ta logado
                              //loga ou pede email
                                  //Abre Pagina checkout
                                                  this.router.navigate(['/shop/cart/isnotlogged']);

             });

               }else{
                 console.log('Não Logado')
                           //Se não ta logado
                              //loga ou pede email
                                  //Abre Pagina checkout
                                                  this.router.navigate(['/shop/cart/isnotlogged']);
               };  


               
              
  }

  

}
