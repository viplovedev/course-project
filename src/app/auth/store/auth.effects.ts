import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { LoginStart, LOGIN_START, LoginSuccess, LoginFail, LOGIN_SUCCESS, SIGNUP_START, SignupStart, CLEAR_ERROR, LOGOUT } from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { AuthResponseData } from '../auth.service';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError, of } from 'rxjs';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

    @Effect()
    signUp = this.actions$.pipe(
        ofType(SIGNUP_START),
        switchMap((authData: SignupStart) => {
            return this.http
            .post<AuthResponseData>(
                'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.firebaseAPIKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            )
            .pipe(
                map((resData)=>this.handleAuthentication(resData)),
                catchError((errorResponse)=>this.handleError(errorResponse))
            );
        })
    )

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(LOGIN_START),
        switchMap((authData: LoginStart) => {
            return this.http
                .post<AuthResponseData>(
                    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.firebaseAPIKey,
                    {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken: true
                    }
                )
                .pipe(
                    map((resData)=>this.handleAuthentication(resData)),
                    catchError((errorResponse)=>this.handleError(errorResponse))
                );
        })
    );

    @Effect({ dispatch: false })
    authSuccess = this.actions$.pipe(
        ofType(LOGIN_SUCCESS,LOGOUT),
        tap(() => {
        this.router.navigate(['/']);
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router:Router
    ) { }

    private handleAuthentication(resData: AuthResponseData) {
        const expirationDate = new Date(new Date().getTime() + Number(resData.expiresIn) * 1000);
        const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
        return new LoginSuccess(user);
    };

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return of(new LoginFail(errorMessage));
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct.';
                break;
        }
        return of(new LoginFail(errorMessage));
    };
}