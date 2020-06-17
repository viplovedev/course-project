import { Action } from '@ngrx/store';

import { User } from '../user.model';

export const LOGIN_START='[Auth] Login Start';

export const LOGIN='[Auth] Login';

export const LOGOUT='[Auth] Logout';

export class LoginStart implements Action{
    type=LOGIN_START;

    constructor(
        public payload:{email:string,password:string},
        ){}
}

export class Login implements Action{
    type=LOGIN;

    constructor(
        public payload:User,
        ){}
}

export class Logout implements Action {
    type=LOGOUT;
}

export type AuthActions =
    | Login
    | Logout;