
import {FileDB} from './file.model'
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
    destaque: boolean;
    
}

export interface ProdutoDTO {
    
    
     id: String;
     codigo: String;
     descricao: String;
     precoun: String;
     Ventrada: String;
     quantidade: number;
     tipo: String;
     Unidade: String;
     UnidadeTributavel: String;
     data: String;
     loja: String;
     SubTotal: number;
     vendedor_id: String;
     files: FileDB[];
     urls: String[];

    }

export interface ResponseFile {

          name: String;
          url: String ;
          type: String;
          data: BlobPart[];

  }

  
