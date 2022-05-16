import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Produto } from './../../../../../app/components/template/produto/produto.model';
import { Venda, Evento } from './../../../../../app/components/template/produto/venda.model';
import { ResponseVendas } from './../../../../../app/components/template/produto/venda.model';
import { Vendido, Tem, Notification } from './../../../../../app/components/template/produto/venda.model';
import { User,Vendedor } from './../../../../../app/components/security/user.model';
import { VendaService } from './../../../../../app/components/template/produto/venda.service';

import {LoginService} from './../../../../../app/components/security/login.service';


    import {Location} from '@angular/common'; 

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./../../../../../app/app.component.css']
})
export class PedidosComponent implements OnInit {

  constructor(private vendaService: VendaService,
  private route: ActivatedRoute,
    private router: Router,
              private authenticationService: LoginService,
               private location: Location ) { }

  aberto: boolean = true;
  vendas: Venda[];
  produtos: Produto[];
  email: String = "";
  selectedVenda: Venda;

  dispachar: String = "Despachar para Entrega";
  dispachou: boolean = false;

  mostraprodutos: boolean = false;


idvendedor: string = "";
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


  fecha(){
      this.aberto = false;
  }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('tipo'));
    this.email = this.route.snapshot.paramMap.get("emailcliente")!;
    this.buscaPedidos();
  }



  buscaPedidos(){
    this.vendaService.findAllByIdComprador(this.email, "this.token").subscribe((result: Venda[])=> {
                                 // this.successMessage = 'Produto Salvo com sucesso!';
                                  //this.vendaService.mensagem(this.successMessage); 

                                    
                                    
                                     this.vendas = result;
                                     
                                  

                                    console.log("Produtos:" +JSON.stringify(this.produtos));
                                    

                                  this.atualizaURL();

                                  

                              }, () => {
                                      this.vendaService.mensagem('Error ao Buscar Pedidos');
                                  
                               });  


  }

   getVendidos(id: any){

    console.log(id);


    this.vendaService.findAllVendidosByIdVenda(id, "this.token").subscribe((result: Produto[])=> {
                                 // this.successMessage = 'Produto Salvo com sucesso!';
                                  //this.vendaService.mensagem(this.successMessage); 
                      
                                   
                                     this.mostraprodutos= true;
                                     this.produtos = result;

                                    console.log("Produtos:" +JSON.stringify(this.produtos));
                                    

                                   // this.preenchevendashoje();

                                  

                              }, () => {
                                      this.vendaService.mensagem('Error ao Buscar Produtos');
                                  
                               });  

  
  this.vendaService.getVendaById(id, "1").subscribe((result: Venda)=> {
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

                                    //getVendedorById

                                    this.CarregaVendedor(this.selectedVenda.vendedor_id);
                                    
                                  
                                  

                              }, () => {
                                      this.vendaService.mensagem('Error ao Salvar produto');
                                  
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

  CarregaVendedor(id: any){
  
  this.authenticationService.getVendedorById(id, "this.token").subscribe((resposta: Vendedor) => {


                                this.vendedor = resposta;
                                console.log('Vendedor: ');
                                console.log(this.vendedor);

                                //this.Location.go(this.vendedor.nomefantasia.replace(" ","")+);

                                


               }, () => {

                                 
                              console.log('Error ao Buscar Dados Vendedor');
                               });

}

atualizaURL(){

  let vendedorfr = sessionStorage.getItem('vendedorurl');

  //Busca URL 

      //atualiza url
       // this.location.replaceState("/some/newstate/");

}



}
