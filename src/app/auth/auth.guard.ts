import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
                private authService:AuthService,
                private router:Router,
                private store:Store<AppState>
                ) {}
    
    canActivate(route: ActivatedRouteSnapshot, 
                state: RouterStateSnapshot): 
                boolean | 
                UrlTree | 
                Observable<boolean | UrlTree> | 
                Promise<boolean | UrlTree> {
                    //this.authService.user.
        return this.store.select('auth').pipe(
                        map(authState => {return authState.user;}),
                        take(1),
                        map(user => {
                        const isAuth = !!user;
                        if(isAuth){
                            return true;
                        }
                        return this.router.createUrlTree(['/auth']);   
                    }));
    }
}