import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { LoginStart, LOGIN_START } from './auth.actions';
import { switchMap, catchError } from 'rxjs/operators';
import { AuthResponseData } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthEffects {

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
                    /*catchError(this.handleError),
                    tap(resData => {
                        this.handleAuthentication(
                            resData.email,
                            resData.localId,
                            resData.idToken,
                            +resData.expiresIn
                        );
                    })*/
                );
        });
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient
    ) { }
}