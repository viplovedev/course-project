import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from './../shared/shared.module';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { appReducer } from '../store/app.reducer';



@NgModule({
  declarations: [
    AuthComponent,
  ],
  exports: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AuthRoutingModule,
    RouterModule
  ]
})
export class AuthModule { }
