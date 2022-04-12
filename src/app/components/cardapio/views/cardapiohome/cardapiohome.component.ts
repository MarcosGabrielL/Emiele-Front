import {Component, OnInit, ChangeDetectorRef, ViewEncapsulation, NgModule} from '@angular/core';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {tap, map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Produto,ProdutoDTO } from './../../../../../app/components/template/produto/produto.model';
import { Venda, Evento, ResponseVendas, Vendido, Tem, Notification  } from './../../../../../app/components/template/produto/venda.model';
import { User } from './../../../../../app/components/security/user.model';
import { VendaService } from './../../../../../app/components/template/produto/venda.service';
import {LoginService} from './../../../../../app/components/security/login.service'
import { NgxDropzoneModule } from 'ngx-dropzone';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer,SafeHtml,SafeUrl } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";


import { ProdutoService } from './../../../../../app/components/template/produto/produto.service';

@Component({
  selector: 'app-cardapiohome',
  templateUrl: './cardapiohome.component.html',
  styleUrls: ['./cardapiohome.component.css']
})
export class CardapiohomeComponent implements OnInit {

  idvendedor: string = "";

  produtos: ProdutoDTO[]=[];
 Semtipo: ProdutoDTO[]=[];
 Hamburguer: ProdutoDTO[]=[];
 Sushi: ProdutoDTO[]=[];
 Pizza: ProdutoDTO[]=[];
 Bolo: ProdutoDTO[]=[];
   Sorvete: ProdutoDTO[]=[];
     Bebida: ProdutoDTO[]=[];
       Pasteis: ProdutoDTO[]=[];
       Lanche: ProdutoDTO[]=[];
       Massa: ProdutoDTO[]=[];
       Refeicao: ProdutoDTO[]=[];
       Higienelar: ProdutoDTO[]=[];
       Higienepessoal: ProdutoDTO[]=[];
       Perfumaria: ProdutoDTO[]=[];
       Utilidades: ProdutoDTO[]=[];
       Campo: ProdutoDTO[]=[];
       Padaria: ProdutoDTO[]=[];
       Acougue: ProdutoDTO[]=[];
       Enlatados: ProdutoDTO[]=[];
       Doces: ProdutoDTO[]=[];
       biscoitos: ProdutoDTO[]=[];
       Cereais: ProdutoDTO[]=[];
       Outros: ProdutoDTO[]=[];
       dog: ProdutoDTO[]=[];
       fruta: ProdutoDTO[]=[];
       pet: ProdutoDTO[]=[];

       successMessage: string = "";
  errorMessage: string = "";

  constructor(private cdRef: ChangeDetectorRef,private authenticationService: LoginService,
              private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private vendaService: VendaService,
              private snackBar: MatSnackBar,
              private cd: ChangeDetectorRef,
              private sanitized: DomSanitizer,
              private modalService: NgbModal,
              private produtoservice: ProdutoService) { }

  ngOnInit(): void {
    this.idvendedor = this.route.snapshot.paramMap.get("idvendedor")!;

    this.buscaProdutoByVendedor();
  }

  buscaProdutoByVendedor(){


     this.produtoservice.findDTOByIdVendedor(this.idvendedor, "1").subscribe((result: ProdutoDTO[])=> {
                                  

                                    this.produtos = result;
                                    console.log("Lista de Produtos: ");
                                    console.log(result);  

                                    if(this.produtos.length == 0){
                                    this.vendaService.mensagem("Este vendedor ainda não tem produtos cadastrados");
                                  }
                                   
                                    this.produtos.forEach( (evento: ProdutoDTO) => { 

                                        if(evento.tipo==="Sem tipo"){
                                            this.Semtipo.push(evento);
                                        }
                                        if(evento.tipo==="Hamburguer"){
                                            this.Hamburguer.push(evento);
                                        }
                                        if(evento.tipo==="Sushi"){
                                            this.Sushi.push(evento);
                                        }
                                        if(evento.tipo==="Pizza"){
                                            this.Pizza.push(evento);
                                        }
                                        if(evento.tipo==="Bolo"){
                                            this.Bolo.push(evento);
                                        }
                                        if(evento.tipo==="Sorvete"){
                                            this.Sorvete.push(evento);
                                        }
                                        if(evento.tipo==="Bebida"){
                                            this.Bebida.push(evento);
                                        }
                                        if(evento.tipo==="Pasteis"){
                                            this.Pasteis.push(evento);
                                        }
                                        if(evento.tipo==="Lanche"){
                                            this.Lanche.push(evento);
                                        }
                                        if(evento.tipo==="Massa"){
                                            this.Massa.push(evento);
                                        }
                                        if(evento.tipo==="Refeição"){
                                            this.Refeicao.push(evento);
                                        }
                                        if(evento.tipo==="Higiene e limpeza do lar"){
                                            this.Higienelar.push(evento);
                                        }
                                        if(evento.tipo==="Higiene e limpeza pessoal"){
                                            this.Higienepessoal.push(evento);
                                        }
                                        if(evento.tipo==="Perfumaria"){
                                            this.Perfumaria.push(evento);
                                        }
                                        if(evento.tipo==="Utilidades dom&#xe9;sticas"){
                                            this.Utilidades.push(evento);
                                        }
                                          if(evento.tipo==="Campo e lazer"){
                                            this.Campo.push(evento);
                                        }
                                            if(evento.tipo==="Padaria"){
                                            this.Padaria.push(evento);
                                        }
                                              if(evento.tipo==="A&#xe7;ougue"){
                                            this.Acougue.push(evento);
                                        }
                                                if(evento.tipo==="Enlatados"){
                                            this.Enlatados.push(evento);
                                        }
                                                  if(evento.tipo==="Doces"){
                                            this.Doces.push(evento);
                                        }
                                                    if(evento.tipo==="Massas e biscoitos"){
                                            this.biscoitos.push(evento);
                                        }
                                                    if(evento.tipo==="Cereais"){
                                            this.Cereais.push(evento);
                                        }
                                                    if(evento.tipo==="Outros"){
                                            this.Outros.push(evento);
                                        }
                                                  if(evento.tipo==="Cachorro Quente"){
                                            this.dog.push(evento);
                                        }
                                                  if(evento.tipo==="Fruta"){
                                            this.fruta.push(evento);
                                        }
                                            if(evento.tipo==="Pet Shop"){
                                            this.pet.push(evento);
                                        }

                                                    
                                   });

                                  


                              }, () => {
                                this.errorMessage = 'Error ao Carregar Produtos';
                                      this.vendaService.mensagem(this.errorMessage);
                                  
                               }); 
  }

  SafeUrl(data: any): SafeUrl{

    return this.sanitized.bypassSecurityTrustUrl('data:image/png;base64,'+data);
                                                  

}

lista(any: any){

  this.router.navigate(['/cardapio/this.idvendedor/any']); 

}

}
