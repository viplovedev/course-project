import { User } from '../user.model';
import * as authActions from './auth.actions';

export interface State {
    user:User
}

const initialState:State = {
    user:null
}

export function authReducer(state:State=initialState,action){
    switch(action.type){
        case authActions.LOGIN:
            const loggedInState = {...state};
            loggedInState.user = action.payload;
            return loggedInState;
        case authActions.LOGOUT:
            const loggedOutState = {...state};
            loggedOutState.user = null;
            return loggedOutState;
        default:
            return state;
    }
}