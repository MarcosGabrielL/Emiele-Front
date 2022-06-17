import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';
import { RegisterService } from '../register.service';
import { Title, Meta } from '@angular/platform-browser';
import { VerifyemailService } from '../verifyemail.service';
import {
  getSupportedInputTypes,
  Platform,
  supportsPassiveEventListeners,
  supportsScrollBehavior,
} from '@angular/cdk/platform';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../../../../app/app.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private title: Title,
  private route: ActivatedRoute,
    private router: Router,
    private authenticationService: LoginService,
    private registerService: RegisterService,
    public platform: Platform
    ,
    public verifyemailservice: VerifyemailService) { }

  //Register Components
    emailreg: string = "";
  passwordreg : string = "";
  firstName : string = "";
  lastName : string = "  ";

   errorMessage = 'Invalid Credentials';
  successMessage: string = "";
   invalidLogin = false;
  loginSuccess = false;
  tipo: String= "1";

     authRequestreg:any ={
    "email":"email",
    "password":"pass",
    "firstName":"first",
    "lastName":"last",
    "tipo": "1"
  };

   authRequestRegister:any ={
    "email":"email",
    "password":"pass"
  };

  ngOnInit(): void {
     this.title.setTitle('Emiele | Cadastro');
  }

   handleRegistration() {
    
    this.authRequestRegister={
    "email":this.emailreg,
    "password":this.passwordreg,
    "firstName":this.firstName,
    "lastName":this.lastName,
    "tipo": this.tipo
     };
    
    this.authRequestreg={
    "email":this.emailreg,
    "password":this.passwordreg
    };

   // console.log(this.authRequestreg);
       //// console.log(this.authRequestRegister);
    this.registerService.registration(this.authRequestRegister).subscribe((result)=> {
        this.successMessage = 'Cadastro com sucesso';
        this.authenticationService.mensagem(this.successMessage); 
            this.authenticationService.authenticationService(this.authRequestreg).subscribe((result)=> {
              localStorage.setItem('this.TOKEN_SESSION_ATTRIBUTE', result+'');
     // console.log('Token:'+localStorage.getItem('this.TOKEN_SESSION_ATTRIBUTE'));
                this.invalidLogin = false;
                this.loginSuccess = true;
                this.authenticationService.createBasicAuthToken(this.emailreg, this.passwordreg);
                this.authenticationService.registerSuccessfulLogin(this.emailreg, this.passwordreg, this.tipo);
                this.successMessage = 'Login com sucesso';
                this.sendEmail();
                this.authenticationService.mensagem(this.successMessage);
                if(this.tipo === "1"){

                 this.router.navigate(['/cadastrar/payment']);
              } if(this.tipo === "2"){
                    this.router.navigate(['/revendedor/perfil']);
              }if(this.tipo === "3"){
                  
                this.router.navigate(['/shop/pedidos/'+this.emailreg]);
                }
              }, () => {
              });
    }, () => {
  this.errorMessage = 'Erro no cadastro';
        this.authenticationService.mensagem(this.errorMessage);
      // console.log("Erro no cadastro");
        
     }); 

          
  }

  sendEmail(){

    

      this.verifyemailservice.sendemail(this.authRequestreg).subscribe((resposta) => {
                //this.authenticationService.mensagem('Email de verificação enviado');
               // console.log(resposta)
            
            },  () => {
                //this.authenticationService.mensagem('Erro ao enviar Email de verificação');
               // console.log("Erro envio email")
              });

    }

}
