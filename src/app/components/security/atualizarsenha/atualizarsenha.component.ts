import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetpasswordService } from '../resetpassword.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-atualizarsenha',
  templateUrl: './atualizarsenha.component.html',
  styleUrls: ['./atualizarsenha.component.css']
})
export class AtualizarsenhaComponent implements OnInit {

  email: string = "";
  token: string = "";
  password: string = "";
  spassword: string = "";
  Message: string = "Senha atualizada com sucesso!";

  constructor(private route: ActivatedRoute, private router: Router,
    public resetpasswordservice: ResetpasswordService, private cdRef:ChangeDetectorRef) { }

  ngOnInit(): void {
      this.route.queryParams.subscribe((params = {}) => {
            
             this.token = params['token'];
             this.email = params['email'];
             console.log(this.token);
    console.log(this.email);
      });

  }

  AttSenha(){

    
    console.log(this.password);


    this.resetpasswordservice.processResetPassword(this.token, this.email, this.password).subscribe((result:any)=> {
      
      //this.resetpasswordservice.mensagem(this.Message);
      console.log(result);
      console.log("Senha atualizada")
      //this.router.navigate(['/home']);
    }, () => {
      console.log("Erro ao atualizar senha");
      //this.resetpasswordservice.mensagem("Erro ao enviar email");
    });
  }

  

}
