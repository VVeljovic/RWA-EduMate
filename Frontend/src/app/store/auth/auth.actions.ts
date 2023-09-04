import {createAction,props} from '@ngrx/store';
import { User } from 'src/app/models/user.model';
export const loginStart = createAction(
    '[Auth] Login Start',
    props<{username:string,password:string}>()
);
 export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{user:User | null, authToken:{access_token:string}}>()
 );

 export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{error:string}>()
 );