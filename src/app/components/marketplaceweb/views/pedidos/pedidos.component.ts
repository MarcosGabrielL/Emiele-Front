import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  constructor() { }

  aberto: boolean = true;

  ngOnInit(): void {
    console.log(sessionStorage.getItem('tipo'));
  }


  fecha(){
      this.aberto = false;
  }

}
