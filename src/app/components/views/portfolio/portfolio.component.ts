import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements AfterContentInit {

  constructor( private router: Router) { }

  carregando: boolean = true;
  mostra: boolean = true;

  aberto: boolean = true;


  fecha(){
      this.aberto = false;
  }

  saibamais(){ 
   
    this.mostra =true;

  }

   wait(ms: number)  {
   }

 async ngAfterContentInit(){
  await  new Promise((resolve)=> {

     setTimeout(resolve, 1000);
    });

    this.carregando=false;
    this.aberto = true;
  }

}
