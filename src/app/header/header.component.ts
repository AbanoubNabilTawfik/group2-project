import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DatastorageService } from '../Services/datastorage.service';
import { AuthenticationService } from '../Services/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit , OnDestroy{
  
  private userSubscription:Subscription;

  isAuthenticated:boolean=false;

  constructor(private dataStorageService:DatastorageService,private authenticationService:AuthenticationService,private router:Router)
  {

  }
 
  ngOnInit(): void {
    this.userSubscription =this.authenticationService.user.subscribe(user=>{
      this.isAuthenticated = !user ?false :true;
    })
  }

  onSaveData()
  {
     this.dataStorageService.storeRecipes();
  }

  onFetchRecipes()
  {
     this.dataStorageService.fetchRecipes();
  }

  onLogOut()
  {
    this.isAuthenticated=false;
    this.authenticationService.logout();
    this.router.navigate(['/auth'])
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  
}
