import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.mode';
import { RecipeService } from '../../Services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent implements OnInit {
   recipe :Recipe;
   id:number;

  constructor(private recipeService:RecipeService,private activatedRoute:ActivatedRoute ,private router:Router)
  {

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:Params)=>{
      this.id = +params['id'];
      this.recipe=this.recipeService.getRecipeById(this.id);
    })
  }

  addToShpoppingList()
  {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe()
  {
   this.router.navigate(['edit'],{relativeTo:this.activatedRoute})
  }

  onDeleteRecipe()
  {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
  }
}
