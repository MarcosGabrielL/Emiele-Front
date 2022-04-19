import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Produto,ProdutoDTO } from './produto.model';
import { Venda, Evento, ResponseVendas, Notification,RequestWrapper } from './venda.model';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  mostranotify: boolean;
  baseUrl: String = environment.baseUrlVendas;

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

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

   getAll():Observable<Venda[]> {
       const url = `${this.baseUrl}/vendas`
    return this.http.get<Venda[]>(url)
    }
    
    //GEt Vendas
    getVendaById (id: String, token: String):Observable<Venda> {
    const url = `${this.baseUrl}/vendas/venda/${id}?id=${id}&token=${token}`
    return this.http.get<Venda>(url)
  }
    
    addVendas(requestWrapper: RequestWrapper , token: String): Observable<Venda>{
    const url = `${this.baseUrl}/vendas/venda/?token=${token}`
    return this.http.post<Venda>(url, requestWrapper);
  
    }
    
    updateVendas(id: String, token: string, venda: Venda):Observable<Venda> {
    const url = `${this.baseUrl}/vendas/venda/update/${id}?id=${id}&token=${token}`
    return this.http.put<Venda>(url, venda)
  
    }
    
    addVendascancel(id: String, token: string):Observable<Venda> {
    const url = `${this.baseUrl}/vendas/venda/cancela?id=${id}&token=${token}`
    return this.http.get<Venda>(url)
    }
    
  
    deleteVendas(id: String, token: string):Observable<void> {
    const url = `${this.baseUrl}/vendas/delete/${id}?token=${token}`
    return this.http.delete<void>(url)
  
    }
    
    //Pega vendas do dia de hoje
     findAllByDataSaida(idvendedor: String, token: string):Observable<Venda[]> {
         
        const url = `${this.baseUrl}/vendas/venda/hoje?idvendedor=${idvendedor}&token=${token}`
    return this.http.get<Venda[]>(url)
    }
     
    //Pega vendas do dia determinado
    findAllByDia(data: String ,idvendedor: String, token: string):Observable<Venda[]> {
         
         const url = `${this.baseUrl}/vendas/venda/dia?idvendedor=${idvendedor}&token=${token}&data=${data}`
    return this.http.get<Venda[]>(url)
    }
     
    //Pega Total de vendidod dia de hoje e perentuareferente ao dia anteriro
    findTotalToday(idvendedor: String, token: string):Observable<ResponseVendas> {
         
      const url = `${this.baseUrl}/vendas/hoje?idvendedor=${idvendedor}&token=${token}`
    return this.http.get<ResponseVendas>(url)
     
     }
     
      //Pega Total de vendidod dia determinado e perentual referente ao dia anteriro
    findTotalDay(data: String ,idvendedor: String, token: string):Observable<ResponseVendas> {
         
      const url = `${this.baseUrl}/vendas/dia?idvendedor=${idvendedor}&token=${token}&data=${data}`
    return this.http.get<ResponseVendas>(url)
     
     
     
     }
     
    //Pega Total Mês atual e percentual ao mes anteriror
     findTotalMes(idvendedor: String, token: string):Observable<ResponseVendas> {
         
      const url = `${this.baseUrl}/vendas/mes?idvendedor=${idvendedor}&token=${token}`
    return this.http.get<ResponseVendas>(url)
     
     }

     //Pega Eventos Por usuario
     findEventos(idvendedor: String, token: string):Observable<Evento[]> {
         
      const url = `${this.baseUrl}/eventos/evento/usuario/${idvendedor}?token=${token}`
    return this.http.get<Evento[]>(url)
     
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

        userNotification (id: String):Observable<Notification[]> {
    const url = `${this.baseUrl}/notifications/notification/user/${id}?id=${id}&token=1`
    return this.http.get<Notification[]>(url)
  }

    AtualizaNotification (Notification: Notification, id: String):Observable<Notification> {
    const url = `${this.baseUrl}/notifications/notification/update/${id}?id=${id}&token=1`
     return this.http.put<Notification>(url, Notification);
  }

  getTempoDecorrido(horacomentad?: any): Observable<string> {
    
     const url = `${this.baseUrl}/util/TempoDecorrido/${horacomentad}`
        return this.http.get(url, { responseType: 'text' })
  }

  //Pega vendas do dia de hoje
     findAllVendidosByIdVenda(idvenda: String, token: string):Observable<Produto[]> {
         
        const url = `${this.baseUrl}/vendidos/vendidos/vendido/venda/${idvenda}?token=${token}`
    return this.http.get<Produto[]>(url)
    }
     
}
