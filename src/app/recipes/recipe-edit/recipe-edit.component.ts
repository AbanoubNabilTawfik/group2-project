import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../../Services/recipe.service';
import { Recipe } from '../recipe.mode';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss'
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode=false;
  recipeForm:FormGroup;

  private initForm()
  {
     let recipeName = '';
     let recipeImagePath ='';
     let recipeDescription= '';
     let recipeIngredients:any = new FormArray([]);

     if(this.editMode)
     {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName=recipe.name;
      recipeDescription=recipe.description;
      recipeImagePath=recipe.imagePath;
      if(recipe.ingredients.length>0)
      {
        for(let ingredient of recipe.ingredients)
        {
          recipeIngredients.push(new FormGroup({
            name:new FormControl(ingredient.name,Validators.required),
            amount:new FormControl(ingredient.amount,[Validators.required,Validators.min(1)])
          }))
        }
      }
     }

     this.recipeForm=new FormGroup({
       name:new FormControl(recipeName,Validators.required),
       imagePath:new FormControl(recipeImagePath,Validators.required),
       description:new FormControl(recipeDescription,Validators.required),
       ingredients:recipeIngredients
     })
  }

  get ingredinetsControls()
  {
    return (<FormArray>(this.recipeForm.get('ingredients'))).controls;
  }
  constructor(private activatedRoute:ActivatedRoute,private recipeService:RecipeService,private router:Router)
  {

  }
  ngOnInit(): void {
   this.activatedRoute.params.subscribe((params:Params)=>{
    this.id =+params['id'];
    this.editMode = params['id'] !=null
    console.log("edit mode",this.editMode);
    this.initForm();
   })
  }

  onAddIngredient()
  {
     (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name:new  FormControl('',Validators.required),
        amount:new FormControl('',[Validators.required,Validators.min(1)])
      })
     )
  }
  onSubmit()
  {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value.name,
    //   this.recipeForm.value.description,
    //   this.recipeForm.value.imagePath,
    //   this.recipeForm.value.ingredients
    // )

    if(this.editMode)
    {
      this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    }
    else
    {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel()
  {
   this.router.navigate(['../'],{relativeTo:this.activatedRoute})
  }
  onDeleteIngredient(index:number)
  {
   (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
