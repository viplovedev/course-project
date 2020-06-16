import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

import * as ShoppingListActions from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

const initialState = {
    ingredients: [
        new Ingredient('Apples (Reducer)', 5),
        new Ingredient('Tomatoes (Reducer)', 10),
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListAction) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, (<ShoppingListActions.AddIngredient>action).payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:

            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = action.payload['ingredient'];
            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredient:null,
                editedIngredientIndex:-1
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            const ingredientsAfterDeletion = state.ingredients.filter((ig, igIndex) => {
                return igIndex != state.editedIngredientIndex;
            })
            return {
                ...state,
                ingredients: ingredientsAfterDeletion,
                editedIngredient:null,
                editedIngredientIndex:-1
            };
        case ShoppingListActions.START_EDIT:
            const selectedIngredient = {...state.ingredients[(<ShoppingListActions.StartEditIngredient>action).payload]};
            return {
                ...state,
                editedIngredient: selectedIngredient,
                editedIngredientIndex: (<ShoppingListActions.StartEditIngredient>action).payload,
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1,
            };
        default:
            return state;
    }
}