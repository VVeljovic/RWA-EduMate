import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder,FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import {Store} from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';
@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent {
  public loginForm:FormGroup;
constructor(private router:Router, private route:ActivatedRoute,private formBuilder:FormBuilder,private store:Store){
  this.loginForm = this.formBuilder.group({username:'',password:''});
}
isLoginRoute():boolean {
  return this.router.url.endsWith('/login');
}
onSubmit() {
  const username = this.loginForm.value.username;
  const password = this.loginForm.value.password;
  console.log(username,password);
  this.store.dispatch(AuthActions.loginStart({username,password}));
  this.router.navigate(['/']);
}
}
