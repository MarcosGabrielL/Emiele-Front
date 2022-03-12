import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import { ProdutoService } from '../../../../../app/components/template/produto/produto.service';
import { Produto} from '../../../../../app/components/template/produto/produto.model';
import {FileService} from '../../../../../app/components/template/produto/file.service';
import { User } from '../../../../../app/components/security/user.model';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

   newProduct: Produto = {
    id: "",
    codigo:"",
    descrição:"",
    preçoUn: 0,
    quantidade: 0,
    tipo:"",
    unidade:"",
    data:"",
    vendedor_id:""
  } 
    successMessage: string = "";
  errorMessage: string = "";
preco: number;
descricao: String = "";

  token: any;
  loaded = 0;
  showProgress = false;
  files: File[] = [];
  closeResult = '';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private fileService: FileService,
    private produtoservice: ProdutoService) { }

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
         this.preco=this.newProduct.preçoUn;
          this.descricao= this.newProduct.descrição;

    }, () => {

          this.errorMessage = 'Error ao Buscar produto';
         
          console.log(this.errorMessage);
        this.produtoservice.mensagem(this.errorMessage);

          this.router.navigate(['/shop/produto-nao-encontrado']);
        //
        
     }); 

  }
}