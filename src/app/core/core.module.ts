import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AuthInterceptorService } from '../auth/auth-interceptor.service';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeService } from '../recipes/recipe.service';
import { shoppingListReducer } from '../shopping-list/store/shopping-list.reducer';
import { appReducer } from './../store/app.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(appReducer)
  ],
  providers: [
    RecipeService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule { }
