import {Component, OnInit, ChangeDetectorRef, ViewEncapsulation, NgModule} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';


import {PerfilpagamentoService} from './../../../../app/components/template/perfilpagamento.service';
import { Perfil, PreferenceItem, NewPreferenceDTO, Root, RootDTO , AutenticacionResponse} from './../../../../app/components/template/perfilpagamento.model';

@Component({
  selector: 'app-creat-accesstoken-in-auth-success',
  templateUrl: './creat-accesstoken-in-auth-success.component.html',
  styleUrls: ['./creat-accesstoken-in-auth-success.component.css']
})
export class CreatAccesstokenInAuthSuccessComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private PerfilpagamentoService: PerfilpagamentoService) { }

  code: any = null;
  state: any = null;
  response:  AutenticacionResponse;
  listo: boolean = false;
  texto: String = "Espere enquanto configuramos sua conta... Não feche essa página";

  ngOnInit(): void {



                     this.code = this.route.snapshot.queryParamMap.get('code');
                     this.state = this.route.snapshot.queryParamMap.get('state');
                 
                  console.log('Code: '+this.code); // price
                

               if(this.code != null && this.state != null){

                //Envie as suas credenciais e o código de autorização ao endpoint /oauth/token para receber como resposta o access token.
                 this. EnviaCredenciais();

               }



}
  

  EnviaCredenciais(){

  this.PerfilpagamentoService.EnviaCredenciais(this.code).subscribe((result: AutenticacionResponse)=> {
      
        /*{
    "access_token": "APP_USR-123456-090515-8cc4448aac10d5105474e1351-1234567",
    "token_type": "bearer",
    "expires_in": 10800,
    "scope": "offline_access read write",
    "user_id": 1234567,
    "refresh_token": "TG-5b9032b4e23464aed1f959f-1234567"
}*/

          this.response = result;
          console.log(result);
        
        //Salva o access token
        this.PerfilpagamentoService.SalvaCredenciais(this.response, this.state).subscribe((result: AutenticacionResponse)=> {

              this.listo = true;

              this.PerfilpagamentoService.mensagemsucess('Autenticado com Sucesso!');

              this.texto = "Autorização Concedida com Sucesso!"

             // this.router.

         }, () => {

              this.PerfilpagamentoService.mensagemerro('Erro ao Salvar Credenciais');
                                  console.log('Erro ao Salvar Credenciais');
         }); 

  }, () => {

      this.PerfilpagamentoService.mensagemerro('Erro ao Buscar Credenciais');
                                  console.log('Erro ao Buscar Credenciais');
  }); 


}

go(){
   this.router.navigate(['/billing']);
}
 
}
