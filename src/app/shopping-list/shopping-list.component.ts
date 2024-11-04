import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../Shared/ingredients.model';
import { ShoppingListService } from '../Services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss'
})
export class ShoppingListComponent  implements OnInit{
 

  ingreidents:Ingredients[] =[]
  constructor(private shoppingListService:ShoppingListService)
  {

  }

  ngOnInit(): void {
    this.ingreidents=this.shoppingListService.getIngredients();
  }

  onEditItem(index:number)
  {
    this.shoppingListService.startedEditing.next(index);
  }
}
