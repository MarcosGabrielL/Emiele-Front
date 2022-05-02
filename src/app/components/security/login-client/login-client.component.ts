import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './../../../../app/components/security/login.service';
import { RegisterService } from './../../../../app/components/security/register.service';
import { Title, Meta } from '@angular/platform-browser';
import { VerifyemailService } from './../../../../app/components/security/verifyemail.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {
  getSupportedInputTypes,
  Platform,
  supportsPassiveEventListeners,
  supportsScrollBehavior,
} from '@angular/cdk/platform';
import { User, Vendedor } from './../../../../app/components/security/user.model';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent implements OnInit {

  login: boolean = true;

  
  constructor(private title: Title,
  private route: ActivatedRoute,
    private router: Router,
    private authenticationService: LoginService,
    private registerService: RegisterService,
    public platform: Platform
    ,
    public verifyemailservice: VerifyemailService,
              private modalService: NgbModal) { }

  //Login Components
   email: string = "";
  password : string = "";
  invalidLogin = false;
  loginSuccess = false;

    authRequest:any ={
    "email":"email",
    "password":"pass"
  };

  //Register Components
    emailreg: string = "";
  passwordreg : string = "";
  firstName : string = " ";
  lastName : string = " ";

   errorMessage = 'Invalid Credentials';
  successMessage: string = "";
  tipo: String= "3";

     authRequestreg:any ={
    "email":"email",
    "password":"pass",
    "firstName":"first",
    "lastName":"last",
    "tipo": "3"
  };

   authRequestRegister:any ={
    "email":"email",
    "password":"pass"
  };

  ngOnInit(): void {
  }

  entrar(){
    this.login = true;
  }
  registrar(){
    this.login = false;
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

    console.log(this.authRequestreg);
       // console.log(this.authRequestRegister);
    this.registerService.registration(this.authRequestRegister).subscribe((result)=> {
        this.successMessage = 'Cadastro com sucesso';
       // this.authenticationService.mensagem(this.successMessage); 
            this.authenticationService.authenticationService(this.authRequestreg).subscribe((result)=> {
              localStorage.setItem('this.TOKEN_SESSION_ATTRIBUTE', result+'');
      console.log('Token:'+localStorage.getItem('this.TOKEN_SESSION_ATTRIBUTE'));
                this.invalidLogin = false;
                this.loginSuccess = true;
                this.authenticationService.createBasicAuthToken(this.emailreg, this.passwordreg);
                this.authenticationService.registerSuccessfulLogin(this.emailreg, this.passwordreg, this.tipo);
                this.successMessage = 'Login com sucesso';
                this.sendEmail();
              //  this.authenticationService.mensagem(this.successMessage);
              
             
                   this.router.navigateByUrl('/att', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/shop/cart/isnotlogged']); // navigate to same route
    }); 
                 
                


              }, () => {
              });
    }, () => {
  this.errorMessage = 'Erro no cadastro';
        this.authenticationService.mensagem(this.errorMessage);
       console.log("Erro no cadastro");
        
     }); 

          
  }

  sendEmail(){

    

      this.verifyemailservice.sendemail(this.authRequestreg).subscribe((resposta) => {
                //this.authenticationService.mensagem('Email de verificação enviado');
                console.log(resposta)
                      this.router.navigateByUrl('/att', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/shop/cart/isnotlogged']); // navigate to same route
    }); 
            
            },  () => {
                //this.authenticationService.mensagem('Erro ao enviar Email de verificação');
                console.log("Erro envio email")
              });

    }

     handleLogin() {
    this.authRequest={
   "email":this.emailreg,
    "password":this.passwordreg
  };
   // console.log(this.authRequest);
      this.authenticationService.authenticationService(this.authRequest).subscribe((result)=> {
              localStorage.setItem('this.TOKEN_SESSION_ATTRIBUTE', result+'');
      console.log('Token:'+localStorage.getItem('this.TOKEN_SESSION_ATTRIBUTE'));
                this.invalidLogin = false;
                this.loginSuccess = true;
                this.authenticationService.createBasicAuthToken(this.emailreg, this.passwordreg);
                this.authenticationService.registerSuccessfulLogin(this.emailreg, this.passwordreg, this.tipo);
                this.successMessage = 'Login com sucesso';
      
     this.router.navigateByUrl('/att', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/shop/cart/isnotlogged']); // navigate to same route
});
     
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
      this.authenticationService.mensagem(this.errorMessage);
    });  
    }    
  


}
