import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from './recipe.mode';
import { RecipeService } from '../Services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent implements OnInit ,OnDestroy{

 selectedRecipe:Recipe;
 recipeSubscribtion:Subscription;

 constructor(private recipeService:RecipeService)
 {
  
 }
  

 ngOnInit(): void {
  this.recipeSubscribtion= this.recipeService.recipeSelected.subscribe((recipe:Recipe)=>{
    this.selectedRecipe=recipe;
   })
}

ngOnDestroy(): void {
 this.recipeSubscribtion.unsubscribe();
}
}
