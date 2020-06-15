import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { AppState } from '../store/app.reducer';
import * as fromShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients:Ingredient[]}>;
  private subscription: Subscription;

  constructor(
    private store:Store<AppState>) { }

  
  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');

    this.subscription = this.store.select('shoppingList').subscribe(object => 
      console.log("store select returned "+object.ingredients)
    );
  }

  onEditItem(index: number) {
    this.store.dispatch(new fromShoppingListActions.StartEditIngredient(index));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}