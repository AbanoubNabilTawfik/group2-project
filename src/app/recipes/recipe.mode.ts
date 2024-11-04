import { Ingredients } from "../Shared/ingredients.model";

export class Recipe
{
    public name:string;
    public description:string;
    public imagePath:string;
    public ingredients:Ingredients[];

    constructor(name:string,desc:string,path:string,ingred:Ingredients[]){
        this.name=name;
        this.description=desc;
        this.imagePath=path;
        this.ingredients=ingred;
    }
}