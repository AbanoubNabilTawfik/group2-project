import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.mode';
import { AuthenticationService } from './authentication.service';
import { exhaustMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatastorageService {

  constructor(private http:HttpClient,private recipeService:RecipeService ,private authenticationService:AuthenticationService) { }

  storeRecipes()
  {
    const recipes =this.recipeService.getRecipes();

    this.http.put('https://group2-project-4360b-default-rtdb.firebaseio.com/recipes.json',recipes)
      .subscribe({
        next:response=>{
          console.log(response)
        }
      })
  }

  fetchRecipes()
  {
    return this.authenticationService.user.pipe(
      take(1),
      exhaustMap(user=>{
      return  this.http.get<Recipe[]>('https://group2-project-4360b-default-rtdb.firebaseio.com/recipes.json');
        
      })).subscribe({
        next:(data)=>{
          this.recipeService.setRecipes(data)
        }
      })
    
    
  }
}
