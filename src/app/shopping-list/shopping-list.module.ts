import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { RouterModule } from '@angular/router';
import { importType } from '@angular/compiler/src/output/output_ast';



@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
    ],
    imports: [
      CommonModule,
      FormsModule,
      RouterModule.forChild([{path:'',component:ShoppingListComponent}])
    ],
    exports: [
      CommonModule,
      ShoppingListComponent,
      ShoppingEditComponent,
    ]
})
export class ShoppingListModule { }
