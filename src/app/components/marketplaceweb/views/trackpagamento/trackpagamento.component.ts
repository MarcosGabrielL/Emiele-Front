import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';


import { Venda, Evento, ResponseVendas, Vendido, Tem, Notification } from './../../../../../app/components/template/produto/venda.model';
import { VendaService } from './../../../../../app/components/template/produto/venda.service';


@Component({
  selector: 'app-trackpagamento',
  templateUrl: './trackpagamento.component.html',
  styleUrls: ['./trackpagamento.component.css']
})
export class TrackpagamentoComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private vendaService: VendaService
              ) { }

  idvenda: any;
  status: any;
  success: boolean = false;
  selectedVenda: Venda;
  comprador: String = "";
  vendedor: String = "";
  proccess: String= "";

  ngOnInit(): void {

    //Resultado do Pagamento
     this.status = this.route.snapshot.queryParamMap.get('resultpag');

      if(this?.status === "approved"){
        this.success = true;
        this.proccess = "2"
                  this.mensagemsucess("Pagamento Aprovado! Aproveite");
                  //Pega id Pagamento
    this.idvenda = this.route.snapshot.queryParamMap.get('idvenda');

    //Busca venda com mesmo id pagamento
      this.BuscaVenda();
               }
               if(this?.status === "in_process"){
                 this.proccess = "0"
                   this.mensagem("Pagamento Em Processo!");
                   //Pega id Pagamento
    this.idvenda = this.route.snapshot.queryParamMap.get('idvenda');

    //Busca venda com mesmo id pagamento
      this.BuscaVenda();
               }
               if(this?.status === "rejected"){
                   this.proccess = "7"
                   this.mensagemerro("Pagamento Rejeitado! Efetue um novo pagamento ou desfrute do plano Gratis");

                   //Busca idvendedor e redireciona para pagina de pedidos
               }

    
    
  }

  BuscaVenda(){


     this.vendaService.getVendaById( this.idvenda, "this.token").subscribe((result: Venda)=> {
                                 
                                    this.selectedVenda = result;

                                    console.log("Produtos:" +this.selectedVenda);

                                    //Busca vendedor
                                    this.vendedor = this.selectedVenda.vendedor_id;

                                    //Busca Comprador
                                    this.comprador = this.selectedVenda.comprador_id;

                                    //Atualiza venda com status
                                    this.selectedVenda.status = this.proccess;
                                     this.vendaService.attVendas("this.token", this.selectedVenda).subscribe((result: Venda)=> {

                                      //Redireciona para pagina de pedidos
                                       this.router.navigate(['/shop/pedidos/'+this.comprador]);

                                    }, () => {
                                                                        
                                                this.mensagem('Erro ao Carregar Pedido!');
                                             });

                                    
                                    
                                   
                                  

                              }, () => {
                                      this.mensagem('Error ao Salvar produto');
                                  
                               }); 
  }

   mensagem(str: string): void {
        console.log(str);
        this.snackBar.open(`${str}`, 'X', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar'],
          duration: 4000
        })
        }
        mensagemsucess(str: string): void {
        console.log(str);
        this.snackBar.open(`${str}`, 'X', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbarsucess'],
          duration: 4000
        })
        }
        mensagemerro(str: string): void {
        console.log(str);
        this.snackBar.open(`${str}`, 'X', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbarerro'],
          duration: 4000
        })
        }

}
