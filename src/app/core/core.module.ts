import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AuthInterceptorService } from '../auth/auth-interceptor.service';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeService } from '../recipes/recipe.service';
import { appReducer } from './../store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../auth/store/auth.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects])
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
