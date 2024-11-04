import { Injectable } from '@angular/core';
import { Ingredients } from '../Shared/ingredients.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
 
  startedEditing = new Subject<number>();

  ingreidents:Ingredients[] =[
    new Ingredients("Apple",5),
    new Ingredients("Mango",10)
  ]

  constructor() { }

  getIngredients()
  {
    return this.ingreidents;
  }

  addIngredient(ingredient:Ingredients)
  {
    this.ingreidents.push(ingredient);
  }

  addIngredients(ingredients:Ingredients[])
  {
    // for(let ingredient of ingredients)
    // {
    //   this.ingreidents.push(ingredient)
    // }

    this.ingreidents.push(...ingredients)
  }

  getIngredientByIndex(index:number)
  {
    return this.ingreidents[index];
  }

  updateIngredient(index:number,newIngredient:Ingredients)
  {
    this.ingreidents[index]=newIngredient;
  }

  DeleteIngredient(index:number)
  {
     this.ingreidents.splice(index,1);
  } 
}
