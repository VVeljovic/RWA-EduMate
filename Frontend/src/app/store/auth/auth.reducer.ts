import {createReducer, on} from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from 'src/app/models/user.model';
export interface AuthState {
    user: User | null;
    authToken:{access_token:string}|null;
    error: string | null;
}
const initialState:AuthState = {
    user:null,
    authToken:null,
    error:null
};
 export const authReducer = createReducer(
    initialState,
    on(AuthActions.loginSuccess,(state,{user,authToken})=>({...state,user,authToken})),
    on(AuthActions.loginFailure,(state,{error})=>({...state,error}))
 );
