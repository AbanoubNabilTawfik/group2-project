import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthResponseData } from '../Models/auth.model';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { User } from '../Models/user.mode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  user = new BehaviorSubject<User>(null);

  constructor(private http:HttpClient) { }

  signup(email:string,password:string)
  {
    return this.http.post<IAuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBs_SJBSMsf_cIpPSveYeCiAZssrIjT5og',{
      email:email,
      password:password,
      returnSecureToken:true
     }).pipe(catchError(this.handleError),tap(responseData=>{
       
      this.handleAuthentication(responseData.email,responseData.localId,responseData.idToken, +responseData.expiresIn);
    
    }))
  }


  login(email:string,password:string)
  {
    return this.http.post<IAuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBs_SJBSMsf_cIpPSveYeCiAZssrIjT5og',{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(this.handleError),tap(responseData=>{
      this.handleAuthentication(responseData.email,responseData.localId,responseData.idToken, +responseData.expiresIn);
    }))
  }

  logout()
  {
    this.user.next(null);
  }

  private handleError(errorResponse:HttpErrorResponse)
  {
    let errorMessage ="Unknown error";
    if(!errorResponse.error || !errorResponse.error.error)
    {
      return throwError(()=>errorMessage);
    }
    switch(errorResponse.error.error.message)
    {
      case 'EMAIL_EXISTS' : 
         errorMessage ="An email already exists";
         break;
      case 'EMAIL_NOT_FOUND':
         errorMessage = "Email not found";
         break;
      case 'INVALID_PASSWORD' :
         errorMessage ="Inavlid password";

    }
    return throwError(()=>errorMessage)
  }

  private handleAuthentication(email:string,userId:string,token:string,expiresIn:number)
  {
    const expirationDate = new Date(new Date().getTime()+ +expiresIn *1000 );

    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );

    this.user.next(user);
  }
}
