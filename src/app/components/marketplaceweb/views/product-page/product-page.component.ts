import { Component, OnInit, SecurityContext,ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import { ProdutoService } from '../../../../../app/components/template/produto/produto.service';
import { Produto, ResponseFile} from '../../../../../app/components/template/produto/produto.model';
import {FileService} from '../../../../../app/components/template/produto/file.service';
import { User } from '../../../../../app/components/security/user.model';
import { DomSanitizer, SafeHtml  } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductPageComponent implements OnInit {

  baseUrl: String = environment.baseUrlVendas;
  i: number= 0;
   theTradingString = "";
   theTradingString1 = "";

   newProduct: Produto = {
    id: "",
    codigo:"",
    descricao:"",
    precoun: 0,
    quantidade: 0,
    tipo:"",
    unidade:"",
    data:"",
    vendedor_id:"",
    destaque: false
  } 

  ResponseFile: ResponseFile;

    successMessage: string = "";
  errorMessage: string = "";
preco: number;
descricao: String = "";

  token: any;
  loaded = 0;
  showProgress = false;
  files: File[] = [];
  closeResult = '';

  urls: string[];
  url1: SafeHtml;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private fileService: FileService,
    private produtoservice: ProdutoService,
    private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.token = localStorage.getItem('this.TOKEN_SESSION_ATTRIBUTE');

     this.route.queryParams.subscribe((params = {}) => {
            
             this.newProduct.id = this.route.snapshot.paramMap.get("id")!;
             console.log(this.newProduct.id);
             this.SearchProduct(this.newProduct.id);
           });
  }

  SearchProduct(id: any){

    

     this.produtoservice.findById(id, this.token).subscribe((result: Produto)=> {
        
        this.newProduct = result;
        console.log('New Product: '+this.newProduct);
         this.preco=this.newProduct.precoun;
          this.descricao= this.newProduct.descricao;

          this.buscafiles();

    }, () => {

          this.errorMessage = 'Error ao Buscar produto';
         
          console.log(this.errorMessage);
        this.produtoservice.mensagem(this.errorMessage);

          this.router.navigate(['/shop/produto-nao-encontrado']);
        //
        
     }); 

  }

  buscafiles(){

       this.fileService.findByIdProduto(this.newProduct.id, this.token).subscribe((result: any)=> {
        
        this.files = result;
        console.log('Files: '+this.files);
         

          this.showFiles();

    }, () => {

          this.errorMessage = 'Error ao Buscar imagens';
         
          console.log(this.errorMessage);
        this.produtoservice.mensagem(this.errorMessage);

          
        
     }); 

  }

  showFiles(){

         this.theTradingString = "";
         this.theTradingString1 = "";
          let cont = 0;
         
    
    Array.from(this.files).forEach(file => {
           if(cont == 0){

             this.theTradingString = this.theTradingString.concat(
                "<a class='thumb-image active' href='//cdn.shopify.com/s/files/1/1047/6452/products/product_1024x1024.png?v=1446769025'"+ 
         "data-index="+cont+">"+
           "<span><img src='"+this.baseUrl+'/file/'+Object.values(file)[0]+"' alt="+1+"></span>"+
                         "  </a>");

              this.theTradingString1 = this.baseUrl+'/file/'+Object.values(file)[0];
                          
                        

           }else{
            this.theTradingString = this.theTradingString.concat(
              "<a class='thumb-image active' href='//cdn.shopify.com/s/files/1/1047/6452/products/product_1024x1024.png?v=1446769025'"+ 
         "data-index="+cont+">"+
           "<span><img src='"+this.baseUrl+'/file/'+Object.values(file)[0]+"' alt="+cont+"></span>"+
                         "  </a>");

           
           }


             
                cont++;          


        });

    

      }

      addcart(){
         this.produtoservice.mensagem("Adicionado ao Carrinho!");
      }
}