import { User } from '../user.model';
import * as authActions from './auth.actions';

export interface State {
    user: User,
    authError: string,
    isLoading: boolean
}

const initialState: State = {
    user: null,
    authError: null,
    isLoading: false
}

export function authReducer(state: State = initialState, action) {
    switch (action.type) {
        case authActions.SIGNUP_START:
            return {
                ...state,
                isLoading: true
            };
        case authActions.LOGIN_START:
            return {
                ...state,
                isLoading: true
            };
        case authActions.LOGIN_SUCCESS:
            const loggedInState = { ...state };
            loggedInState.user = action.payload;
            loggedInState.isLoading = false;
            return loggedInState;
        case authActions.LOGIN_FAIL:
            const loginFailedState = { ...state };
            loginFailedState.authError = action.payload;
            loginFailedState.isLoading = false;
            return loginFailedState;
        case authActions.CLEAR_ERROR:
            return {
                ...state,
                authError:null
            };
        case authActions.LOGOUT:
            const loggedOutState = { ...state };
            loggedOutState.user = null;
            return loggedOutState;
        default:
            return state;
    }
}