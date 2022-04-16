
import { Produto,ProdutoDTO } from './produto.model';

export interface Venda{
    
    id: String;
    diavenda: String; 
    idvendas: number;
    caixa: String;
    loja: String;
    datavenda: String;
    datacancelamento: String;
    valor: String;
    recebido1: number; 
    recebido2: number; 
    recebido3: number;  
    troco: String;
    modopagamento1: String;
    modopagamento2: String;
    modopagamento3: String;
    vendedor_id: String;
    comprador_id: String;
   
   
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
   status: String;
    
}

export interface Vendido{
     
     id: String;
     Vendedor_ID: String;
     codigo: String;
     descrição: String;
     Tipo: String;
     Loja: String;
     Caixa: String;
     datasaida: String;
     IdVenda: number;
     quantidade: number;
}

export interface ResponseVendas {
    
     total: String;
     percentual: String;
  }

export interface Evento{

     id: String;
     message: String;
     info: String;
     date: String;
     cod: String;
     level: String;
     usuario: String;
}

export interface Tem{
     tem: boolean;
}

export interface Notification{
     id: String;
     message: String;
     info: String;
     date: String;
     cod: String;
     level: String;
     usuario: String;
     isRead: boolean;
}

export interface Produto1{
      
      id: String;
    
      codigo: String;
    
     descrição: String;
    
     preçoUn: String;
    
     Ventrada: String;
    
     quantidade: number;
    
     tipo: String;
    
     Unidade: String;
    
     UnidadeTributavel: String;

     data: String;
    
     loja : String;
    
     SubTotal: number;
    
     vendedor_id: String;
    
     CST: String;
    
     CFOP: String;
    
     BaseICMS: String;
    
     ICMS: String;
    
     AliquotaICMS: String;
    
    
     CEST: String;
    
     CEAN: String;
    
     CEANTrib: String;
    
     QTrib: String;
    
     VUnTrib: String;
    

     Item: number;

    
     BCICMS: String;
    
     BCICMSST: String;
    
     PMVAST: String;
    
     PRedBCST: String;
    
     VBCST: String;
    
     PICMSST: String;//Valor
    
     VICMSST: String;//Percentual
    
     PRedBC: String;
    
     PDif: String;
    
     VICMSDif: String;
    
     VICMS: String;
    
     PCredSN: String;
    
     VCredICMSSN: String;
    
    
     CSTPIS: String;
    
     VBCPIS: String;
    
     PPIS: String;
    
     VPIS: String;
    
    
     CSTCOFINS: String;
    
     VBCCOFINS: String;
    
     PCOFINS: String;
    
     VCOFINS: String;
    
    
     AFederalN: String;
    
     AFederalI: String;
    
     AEstadual: String;
    
     AMunicipal: String;
}

 export interface RequestWrapper {

    produtos: ProdutoDTO[];
    vendas: Venda;

}

 
