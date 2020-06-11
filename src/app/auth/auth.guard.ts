import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Injectable } from "@angular/core";
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
                private authService:AuthService,
                private router:Router
                ) {}
    
    canActivate(route: ActivatedRouteSnapshot, 
                state: RouterStateSnapshot): 
                boolean | 
                UrlTree | 
                Observable<boolean | UrlTree> | 
                Promise<boolean | UrlTree> {
        return this.authService
                    .user
                    .pipe(
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