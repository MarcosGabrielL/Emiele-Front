import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetpasswordService } from '../resetpassword.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recuperarsenha',
  templateUrl: './recuperarsenha.component.html',
  styleUrls: ['./recuperarsenha.component.css']
})
export class RecuperarsenhaComponent implements OnInit {

  email: string = "";
  Message: string = "Emil enviado com sucesso!";

  constructor(private route: ActivatedRoute, private router: Router,
    public resetpasswordservice: ResetpasswordService, private cdRef:ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  handleLogin(){
    console.log(this.email);
    this.resetpasswordservice.processForgotPassword(this.email).subscribe((result:any)=> {
      
      this.resetpasswordservice.mensagem(this.Message);
      this.router.navigate(['/home']);
    }, () => {
      
      this.resetpasswordservice.mensagem("Erro ao enviar email");
    });
  }

}
