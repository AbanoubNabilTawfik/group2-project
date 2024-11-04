import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../Services/authentication.service';
import { Observable } from 'rxjs';
import { IAuthResponseData } from '../Models/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
 isLoggedInMode=true;
 isLoading=false;
 error:any=null;

 constructor(private authenticationService:AuthenticationService,private router:Router)
 {

 }

 onSwitchMode()
 {
  this.isLoggedInMode=!this.isLoggedInMode;
 }

 onSubmit(form:NgForm)
 {
  if(!form.valid)
    return;
  const email = form.value.email;
  const password =form.value.password;
  this.isLoading=true;

  let authObs :Observable<IAuthResponseData>;
  
  if(this.isLoggedInMode)
  {
    authObs= this.authenticationService.login(email,password);
  }
  else
  {
    authObs= this.authenticationService.signup(email,password);
  }
  
  authObs.subscribe({
    next:data=>{
      console.log(data);
      this.isLoading=false
      this.router.navigate(['/recipes'])
    },
    error:errorMessage=>{
      this.error=errorMessage
      this.isLoading=false
    }
  });
  form.reset();
 }
}
