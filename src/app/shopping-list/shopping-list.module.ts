import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { LoggingService } from '../logging.service';



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
    ],
    providers: [
      LoggingService
    ]
})
export class ShoppingListModule { }
