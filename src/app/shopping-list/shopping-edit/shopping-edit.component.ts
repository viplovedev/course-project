import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';

import { Ingredient } from '../../shared/ingredient.model';
import { AddIngredient, StopEditIngredient, UpdateIngredient } from '../store/shopping-list.actions';
import { DeleteIngredient } from './../store/shopping-list.actions';
import * as fromShoppingListReducer from './../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    private store:Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
    .subscribe(
      (state:fromShoppingListReducer.State) => {
        if(state.editedIngredientIndex > -1){
          this.editedItemIndex = state.editedIngredientIndex;
          this.editMode = true;
          this.editedItem = state.editedIngredient;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      }
    )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      //this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new UpdateIngredient({ingredient:newIngredient}));
    } else {
      //this.slService.addIngredient(newIngredient);
      this.store.dispatch(new AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
    this.store.dispatch(new StopEditIngredient());
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    //this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new DeleteIngredient(this.editedItemIndex));
    this.onClear();
    this.store.dispatch(new StopEditIngredient());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new StopEditIngredient());
  }

}
