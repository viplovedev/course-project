import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export var ADD_INGREDIENT = '[Shopping List] Add Ingredient';

export var ADD_INGREDIENTS = '[Shopping List] Add Ingredients';

export var UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';

export var DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';

export var START_EDIT = '[Shopping List] Start Edit';

export var STOP_EDIT = '[Shopping List] Stop Edit';

export class AddIngredient implements Action {
    type = ADD_INGREDIENT;

    constructor(public payload:Ingredient){}
}

export class AddIngredients implements Action {
    type = ADD_INGREDIENTS;

    constructor(public payload:Ingredient[]){}
}

export class UpdateIngredient implements Action {
    type = UPDATE_INGREDIENT;

    constructor(public payload:{ingredient:Ingredient}){}
}

export class DeleteIngredient implements Action {
    type = DELETE_INGREDIENT;

    constructor(public payload:number){}
}

export class StartEditIngredient implements Action {
    type = START_EDIT;

    constructor(public payload:number){}
}

export class StopEditIngredient implements Action {
    type = STOP_EDIT;

    constructor(){}
}

export type ShoppingListAction = 
    | AddIngredient 
    | AddIngredients 
    | UpdateIngredient 
    | DeleteIngredient
    | StartEditIngredient;