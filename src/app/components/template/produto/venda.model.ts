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
   Status: String;
    
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

 
