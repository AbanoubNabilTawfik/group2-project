import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.mode';
import { RecipeService } from '../../Services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit{
 
  @Output() recipeWasSelected =new EventEmitter<Recipe>(); 

   constructor(private recipeService:RecipeService,private activatedRoute:ActivatedRoute,private router:Router)
   {

   }

   recipes:Recipe[]=[]

   ngOnInit(): void {
     this.recipes=this.recipeService.getRecipes();
     this.recipeService.recipeChanged.subscribe((recipes:Recipe[])=>{
      this.recipes=recipes;
     })
  }

  onNewRecipe()
  {
    this.router.navigate(['new'],{relativeTo:this.activatedRoute})
  }
   

}
