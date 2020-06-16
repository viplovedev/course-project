import { ActionReducerMap } from '@ngrx/store';

import * as fromAuthReducer from './../auth/store/auth.reducer';
import * as fromShoppingListReducer from './../shopping-list/store/shopping-list.reducer';

export interface AppState {
    auth:fromAuthReducer.State,
    shoppingList:fromShoppingListReducer.State
}

export const appReducer:ActionReducerMap<AppState> = {
    auth:fromAuthReducer.authReducer,
    shoppingList:fromShoppingListReducer.shoppingListReducer
}