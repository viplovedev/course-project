import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';


const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'auth', 
    loadChildren: () => import ('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'recipes', 
    loadChildren: () => import ('./recipes/recipe.module').then(m => m.RecipeModule) },
  { path: 'shopping-list', 
    loadChildren: () => import ('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
