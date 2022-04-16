import { Component, OnInit } from '@angular/core';

import { DomSanitizer,SafeHtml,SafeUrl } from '@angular/platform-browser';

import { Produto,ProdutoDTO } from './../../../../../app/components/template/produto/produto.model';
import { User,Vendedor } from './../../../../../app/components/security/user.model';
import { VendaService } from './../../../../../app/components/template/produto/venda.service';
import { Venda,RequestWrapper } from './../../../../../app/components/template/produto/venda.model';


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
              private route: ActivatedRoute) { }

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
  token: string = "";

  ngOnInit(): void {
    this.produtos = JSON.parse(sessionStorage.getItem('Produtos')!);

    this.produtos.forEach( (evento: ProdutoDTO) => { 
        this.subtotal = this.subtotal + evento.SubTotal;
         this.total = this.subtotal;                                           
     });
    
    this.vendedor = JSON.parse(sessionStorage.getItem('Vendedor')!);
    

    console.log(this.produtos);
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


  this.venda.valor= "" + this.subtotal;
  this.venda.datavenda= "" +new Date;
  this.venda.recebido1 = this.total;
  this.venda.modopagamento1= "1";
  this.venda.vendedor_id= this.produtos[0].vendedor_id;
  this.venda.comprador_id = "1";

  this.request.vendas = this.venda;
  this.request.produtos = this.produtos;


  this.token = localStorage.getItem('this.TOKEN_SESSION_ATTRIBUTE')!;


   this.VendaService.addVendas(this.request, this.token).subscribe((result: Venda)=> {

    this.VendaService.mensagem('Pedido Efetuado com sucesso!');
     sessionStorage.setItem('Produtos', JSON.stringify([]));
     sessionStorage.setItem('Vendedor', JSON.stringify({}));
     sessionStorage.setItem('Pedidos', JSON.stringify(this.request));

    this.router.navigate(['/shop/pedidos/1']);


  }, () => {
                                    
                                   this.VendaService.mensagem('Erro ao Efetuar Pedido!');
                                  
                               });
 }


}
