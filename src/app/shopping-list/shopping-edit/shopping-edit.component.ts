import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredients } from '../../Shared/ingredients.model';
import { ShoppingListService } from '../../Services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.scss'
})
export class ShoppingEditComponent implements OnInit ,OnDestroy{
  subscription:Subscription;
  editMode=false;
  editedItemIndex:number;
  editiedItem:any; 

  @ViewChild('f',{static:true}) shoppingForm :NgForm;
  
  constructor(private shoppingListService:ShoppingListService)
  {

  }

  ngOnInit(): void {
    this.subscription=this.shoppingListService.startedEditing.subscribe((index:number)=>{
      this.editMode=true;
      this.editedItemIndex=index;
      this.editiedItem=this.shoppingListService.getIngredientByIndex(index);
      this.shoppingForm.setValue({
        name:this.editiedItem.name,
        amount:this.editiedItem.amount
      })
    })
  }

  onAddItem(form:NgForm)
  {
     const value = form.value;
     const ingredient = new Ingredients(value.name ,value.amount);
     if(this.editMode)
     {
      this.shoppingListService.updateIngredient(this.editedItemIndex,ingredient);
     }
     else
     {
      this.shoppingListService.addIngredient(ingredient);
     }

     this.editMode=false;
     form.reset();
     
  }

  onClear()
  {
    this.shoppingForm.reset();
    this.editMode=false;
  }

  onDelete()
  {
    this.shoppingListService.DeleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
