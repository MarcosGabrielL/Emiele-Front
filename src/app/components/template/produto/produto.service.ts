import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Produto,ProdutoDTO } from './produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

   baseUrl: String = environment.baseUrlVendas;
   
  produtos: Produto[];
  id: any = 0;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  findAll():Observable<Produto[]> {
    const url = `${this.baseUrl}/produtos`
    return this.http.get<Produto[]>(url)
  }
  
   findById(id: any, token: string): Observable<Produto> {
    const url = `${this.baseUrl}/produtos/produto?id=${id}&token=${token}`
    return this.http.get<Produto>(url)
  }

  findByIdVendedor(id: any, token: string): Observable<Produto[]> {
    const url = `${this.baseUrl}/produtos/produto/byvendedor?id=${id}&token=${token}`
    return this.http.get<Produto[]>(url)
  }  

 create(produto: Produto, token: string,  vendedorid: any): Observable<Produto>{
     console.log('id: '+vendedorid);
    const url = `${this.baseUrl}/produtos/produto/add?token=${token}&vendedorid=${vendedorid}`
    return this.http.post<Produto>(url, produto);
  }
  
  delete(id: String, token: string):Observable<void> {
    const url = `${this.baseUrl}/delete/${id}?token=${token}`
    return this.http.delete<void>(url)
  }

  update(categoria: Produto, token: string):Observable<void> {
    const url = `${this.baseUrl}/produto/update/id=${categoria.id}&token=${token}`
    return this.http.put<void>(url, categoria)
  }

  findDTOByIdVendedor(id: any, token: string): Observable<ProdutoDTO[]> {
    const url = `${this.baseUrl}/produtos/produtodto/byvendedor?id=${id}&token=${token}`
    return this.http.get<ProdutoDTO[]>(url)
  } 
  
  mensagem(str: string): void {
        //console.log(str);
        this._snack.open(`${str}`, 'OK', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar'],
          duration: 4000
        })
        }

  setId(id: any){
      this.id = id;
       sessionStorage.setItem('PRODUTO_ID_SESSION', this.id)
  }

  getId(): any{
    return sessionStorage.getItem('PRODUTO_ID_SESSION')
  }
}
