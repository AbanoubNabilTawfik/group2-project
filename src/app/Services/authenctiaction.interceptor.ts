import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthenticationService } from "./authentication.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:"root"
})
export class AuthenticationInterceptor implements HttpInterceptor
{
    constructor(private authenticationService:AuthenticationService)
    {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       return this.authenticationService.user.pipe(
        take(1),
        exhaustMap(user=>{
            if(!user)
            {
                return next.handle(req);
            }
            const modifiedRequest = req.clone({
                params:new HttpParams().set('auth',user.token)
            })
            return next.handle(modifiedRequest)
        })
       )
    }
    
}