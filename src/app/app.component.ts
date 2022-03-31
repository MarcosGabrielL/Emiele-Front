import { Component, OnInit } from '@angular/core';
import { VendaService } from './components/template/produto/venda.service';
import { Notification } from './components/template/produto/venda.model';
import { User } from './components/security/user.model';
import {LoginService} from './components/security/login.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'emiele';

mostranotify: boolean = false;
 vendedor_id: String = "";

constructor(
private vendaService: VendaService){}

ngOnInit(): void {

    this.vendaService.mostranotify = this.mostranotify;

   // this.tem[0] = false;()
   this.getNotifications();
  }

  async getNotifications(){
     

 }

}
