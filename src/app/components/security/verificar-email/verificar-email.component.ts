import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VerifyemailService } from '../verifyemail.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-verificar-email',
  templateUrl: './verificar-email.component.html',
  styleUrls: ['./verificar-email.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerificarEmailComponent implements OnInit {

  token: String = "";
  email: String = "";
  isSucessful: boolean = true; 

  constructor(private route: ActivatedRoute, private router: Router,
    public verifyemailservice: VerifyemailService, private cdRef:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params = {}) => {
            
             this.token = params['token'];
             this.email = params['email'];

            // console.log(this.token + "+" + this.email);
            this.verifyemailservice.Verifyemail(this.token , this.email).subscribe((resposta: boolean) => {
                //this.verifyemailservice.mensagem('Email verificado com sucesso');
                this.isSucessful = true;
                this.cdRef.detectChanges();
                //this.router.navigate(['/sucess']);
                 console.log("Sucesso");
                 this.router.navigate(['/home']);
            
            },  () => {
                //this.verifyemailservice.mensagem('Erro ao verificar Email');
                this.isSucessful = false;
                this.cdRef.detectChanges();
                 //this.router.navigate(['/fail']);
                console.log("Erro");
              });

          });


  }

}
