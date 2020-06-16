import { Action } from '@ngrx/store';

import { User } from '../user.model';

export const LOGIN='LOGIN';

export const LOGOUT='LOGOUT';

export class Login implements Action{
    type=LOGIN;

    constructor(
        user:User,
        ){}
}

export class Logout implements Action {
    type=LOGOUT;
}

export type AuthActions =
    | Login
    | Logout;