import { Action } from '@ngrx/store';
import { User } from '../user.model';


export const SIGNUP_START ='[Auth] Signup Start';

export const SIGNUP_SUCCESS ='[Auth] Signup Success';

export const LOGIN_START='[Auth] Login Start';

export const LOGIN_SUCCESS='[Auth] Login Success';

export const LOGIN_FAIL='[Auth] Login Fail';

export const CLEAR_ERROR = '[Auth] Clear Error';

export const LOGOUT='[Auth] Logout';

export class SignupStart implements Action {
    type=SIGNUP_START;

    constructor(
        public payload:{email:string,password:string},
        ){}
}

export class LoginStart implements Action {
    type=LOGIN_START;

    constructor(
        public payload:{email:string,password:string},
        ){}
}

export class LoginSuccess implements Action{
    type=LOGIN_SUCCESS;

    constructor(
        public payload:User,
        ){}
}

export class LoginFail implements Action{
    type=LOGIN_FAIL;

    constructor(
        public payload:string,
        ){}
}

export class ClearError implements Action{
    type=CLEAR_ERROR;

    constructor(){}
}

export class Logout implements Action {
    type=LOGOUT;
}

export type AuthActions =
| SignupStart
| LoginStart
| LoginSuccess
| LoginFail
| ClearError
| Logout;