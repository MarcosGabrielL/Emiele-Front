import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';
import { RegisterService } from '../register.service';
import { Title, Meta } from '@angular/platform-browser';
import {
  getSupportedInputTypes,
  Platform,
  supportsPassiveEventListeners,
  supportsScrollBehavior,
} from '@angular/cdk/platform';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private title: Title,
  private route: ActivatedRoute,
    private router: Router,
    private authenticationService: LoginService,
    private registerService: RegisterService,
    public platform: Platform) { }

  //Register Components
    emailreg: string = "";
  passwordreg : string = "";
  firstName : string = "";
  lastName : string = "";

   errorMessage = 'Invalid Credentials';
  successMessage: string = "";
   invalidLogin = false;
  loginSuccess = false;

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

  ngOnInit(): void {
     this.title.setTitle('Emiele | Cadastro');
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

}
