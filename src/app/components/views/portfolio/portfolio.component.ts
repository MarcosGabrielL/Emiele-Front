import { Component, OnInit, AfterViewInit, AfterContentInit,ViewEncapsulation } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PortfolioComponent implements AfterContentInit {

  constructor( private router: Router, private metaTagService: Meta) { }

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


    this.metaTagService.addTags([
      {
        name: 'Emiele',
        content: 'Aplicativo e site de delivery própio',
      },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Marcos Gabriel' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2022-05-22', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' },
    ]);
  

  await  new Promise((resolve)=> {

     setTimeout(resolve, 1000);
    });

    this.carregando=false;
    this.aberto = true;
  }

}
