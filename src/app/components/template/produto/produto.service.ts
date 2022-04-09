import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Produto } from './produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

   baseUrl: String = environment.baseUrlVendas;
   
  produtos: Produto[];

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  findAll():Observable<Produto[]> {
    const url = `${this.baseUrl}/produtos`
    return this.http.get<Produto[]>(url)
  }
  
   findById(id: number, token: string): Observable<Produto> {
    const url = `${this.baseUrl}/produtos/produto?id=${id}&token=${token}`
    return this.http.get<Produto>(url)
  }

  findByIdVendedor(id: any, token: string): Observable<Produto[]> {
    const url = `${this.baseUrl}/produtos/produto/byvendedor?id=${id}&token=${token}`
    return this.http.get<Produto[]>(url)
  }  

 create(Produto: Produto, token: string): Observable<Produto>{
    const url = `${this.baseUrl}/produtos/produto/add?token=${token}`
    return this.http.post<Produto>(url, Produto);
  }
  
  delete(id: String, token: string):Observable<void> {
    const url = `${this.baseUrl}/delete/${id}?token=${token}`
    return this.http.delete<void>(url)
  }

  update(categoria: Produto, token: string):Observable<void> {
    const url = `${this.baseUrl}/produto/update/id=${categoria.id}&token=${token}`
    return this.http.put<void>(url, categoria)
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
}
