import { FormsModule } from '@angular/forms';
import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
    ],
    imports: [
      CommonModule,
      FormsModule
    ],
    exports: [
      CommonModule,
      ShoppingListComponent,
      ShoppingEditComponent,
    ]
})
export class ShoppingListModule { }
