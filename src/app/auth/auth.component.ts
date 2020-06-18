import { PlaceholderDirective } from './../shared/placeholder.directive';
import { AlertComponent } from './../shared/alert/alert.component';
import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { LoginStart, SignupStart, ClearError } from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  alertCloseSubs: Subscription;
  storeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(
      authState => {
        this.isLoading = authState.isLoading;
        this.error = authState.authError;
      }
    )
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      this.store.dispatch(new LoginStart({ email: email, password: password }));
    } else {
      this.store.dispatch(new SignupStart({ email: email, password: password }));
    }

    form.reset();
  }

  showErrorAlert(errorMessage: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const alertContainerRef = this.alertHost.viewContainerRef;
    alertContainerRef.clear();
    const alertComponentRef = alertContainerRef.createComponent(alertCmpFactory);
    alertComponentRef.instance.message = errorMessage;
    this.alertCloseSubs = alertComponentRef.instance.close.subscribe(
      () => alertContainerRef.clear()
    );

  }

  onHandleError() {
    this.store.dispatch(new ClearError());
  }

  ngOnDestroy(): void {

    if (this.alertCloseSubs)
      this.alertCloseSubs.unsubscribe();
    
    if(this.storeSub)
      this.storeSub.unsubscribe();
  }
  
}