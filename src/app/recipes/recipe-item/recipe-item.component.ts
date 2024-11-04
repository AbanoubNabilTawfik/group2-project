import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../recipe.mode';
import { RecipeService } from '../../Services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.scss'
})
export class RecipeItemComponent {
 @Input() recipe :Recipe;
 @Input() index:number;
 
 constructor(private recipeService:RecipeService)
 {

 }
}
