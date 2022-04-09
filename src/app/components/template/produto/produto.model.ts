export interface Produto{
    
    id: String;
    codigo:String;
    descricao:String;
    precoun: number;
    quantidade: number;
    tipo:String;
    unidade:String;
    data:String;
    vendedor_id:String;
    
}

export interface ResponseFile {

          name: String;
          url: String ;
          type: String;
          data: BlobPart[];

  }
