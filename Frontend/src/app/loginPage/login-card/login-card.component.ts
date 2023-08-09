import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder,FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent {
  public loginForm:FormGroup;
constructor(private router:Router, private route:ActivatedRoute,private formBuilder:FormBuilder,private userService:UserService){
  this.loginForm = this.formBuilder.group({username:'',password:''});
}
isLoginRoute():boolean {
  return this.router.url.endsWith('/login');
}
onSubmit() {
  const username = this.loginForm.value.username;
  console.log('Username:', this.loginForm.value.username);
  const password = this.loginForm.value.password;
  console.log('Password:', this.loginForm.value.password);
  let accessToken:string = '';
  this.userService.login(username,password).subscribe((response:any)=>{
    accessToken = response.access_token;
    this.userService.getUser(accessToken).subscribe((user:User)=>{ 
    })
  });
  this.router.navigate(['/']);
}
}
