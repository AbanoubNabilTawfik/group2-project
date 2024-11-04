import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.mode';
import { Ingredients } from '../Shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new Subject<Recipe>();
  recipeChanged = new Subject<Recipe[]>();

  recipes:Recipe[]=[]
  constructor(private shoppingListService:ShoppingListService) { }

  getRecipes()
  {
    return this.recipes;
  }

  addIngredientToShoppingList(ingredients:Ingredients[])
  {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipeById(id:number)
  {
    return this.recipes[id];
  }

  addRecipe(recipe:Recipe)
  {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes);
  }

  updateRecipe(index:number,newRecipe:Recipe)
  {
    this.recipes[index]=newRecipe;
    this.recipeChanged.next(this.recipes);
  }

  deleteRecipe(index:number)
  {
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes);
  }

  setRecipes(recipes:Recipe[])
  {
    this.recipes=recipes;
    this.recipeChanged.next(this.recipes);
  }
}
