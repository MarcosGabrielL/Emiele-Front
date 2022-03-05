import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';
import { RegisterService } from '../register.service';
import { VerifyemailService } from '../verifyemail.service';
import {
  getSupportedInputTypes,
  Platform,
  supportsPassiveEventListeners,
  supportsScrollBehavior,
} from '@angular/cdk/platform';

@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html',
  styleUrls: ['../../../../app/app.component.css']
})
export class SigninComponent implements OnInit {

//Login Components
   email: string = "";
  password : string = "";
  errorMessage = 'Erro ao Fazer Login';
  successMessage: string = "";
  invalidLogin = false;
  loginSuccess = false;

    authRequest:any ={
    "email":"email",
    "password":"pass"
  };

//Register Components
    emailreg: string = "";
  passwordreg : string = "";
  firstName : string = "";
  lastName : string = "";

     authRequestreg:any ={
    "email":"email",
    "password":"pass",
    "firstName":"first",
    "lastName":"last"
  };
     authRequestRegister:any ={
    "email":"email",
    "password":"pass"
  };

    supportedInputTypes = Array.from(getSupportedInputTypes()).join(', ');
  supportsPassiveEventListeners = supportsPassiveEventListeners();
  supportsScrollBehavior = supportsScrollBehavior();

    isMobile = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: LoginService,
    private registerService: RegisterService,
    public platform: Platform,
    public verifyemailservice: VerifyemailService) {   }


  ngOnInit(): void {
    if (this.platform.IOS) {
      this.isMobile = true;
    }else{
      if (this.platform.ANDROID) {
      this.isMobile = true;
        }  
    }
  }
    
    handleLogin() {
    this.authRequest={
    "email":this.email,
    "password":this.password
  };
   // console.log(this.authRequest);
    this.authenticationService.authenticationService(this.authRequest).subscribe((result)=> {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.authenticationService.createBasicAuthToken(this.email, this.password);
      this.authenticationService.registerSuccessfulLogin(this.email, this.password);
      this.successMessage = 'Login Successful.';
      this.authenticationService.mensagem(this.successMessage);
      this.router.navigate(['/index']);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
      this.authenticationService.mensagem(this.errorMessage);
    });      
  }

 handleRegistration() {
    
    this.authRequestRegister={
    "email":this.emailreg,
    "password":this.passwordreg,
    "firstName":this.firstName,
    "lastName":this.lastName
     };
    
    this.authRequestreg={
    "email":this.emailreg,
    "password":this.passwordreg
    };
       // console.log(this.authRequestRegister);
    this.registerService.registration(this.authRequestRegister).subscribe((result)=> {
        this.successMessage = 'Cadastro com sucesso';
        this.authenticationService.mensagem(this.successMessage); 
            this.authenticationService.authenticationService(this.authRequestreg).subscribe((result)=> {
                this.invalidLogin = false;
                this.loginSuccess = true;
                this.authenticationService.createBasicAuthToken(this.emailreg, this.passwordreg);
                this.authenticationService.registerSuccessfulLogin(this.emailreg, this.passwordreg);
                this.successMessage = 'Login com sucesso';
                this.authenticationService.mensagem(this.successMessage);
                this.sendEmail();
                this.router.navigate(['/index']);
              }, () => {
                this.invalidLogin = true;
                this.loginSuccess = false;
                this.authenticationService.mensagem(this.errorMessage);
                this.router.navigate(['/index']);
              });
    }, () => {
  this.errorMessage = 'Erro no cadastro';
        this.authenticationService.mensagem(this.errorMessage);
        
     }); 
   
  }

  sendEmail(){

    

      this.verifyemailservice.sendemail(this.authRequestreg).subscribe((resposta) => {
                this.authenticationService.mensagem('Email de verificação enviado');
            
            },  () => {
                this.authenticationService.mensagem('Erro ao enviar Email de verificação');
              });

    }

}