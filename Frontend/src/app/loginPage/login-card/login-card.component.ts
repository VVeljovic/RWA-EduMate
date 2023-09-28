import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder,FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import {Store} from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';
import { Observable, filter, map, of, switchMap, take } from 'rxjs';
import { selectAuthToken } from 'src/app/store/auth/auth.selector';
@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit {
  public loginForm:FormGroup;
  token$ : Observable<{ access_token: string; } | null>|undefined;
constructor(private router:Router, private route:ActivatedRoute,private formBuilder:FormBuilder,private store:Store,private service:UserService){
  this.loginForm = this.formBuilder.group({name:'',surname:'',course:'',year:-1,username:'',email:'',password:''});
}
ngOnInit(): void {
  this.token$= this.store.select(selectAuthToken);
}
isLoginRoute():boolean {
  return this.router.url.endsWith('/login');
}
onSubmit() {
  if(this.isLoginRoute())
  {
  const username = this.loginForm.value.username;
  const password = this.loginForm.value.password;
  console.log(username,password);
  this.store.dispatch(AuthActions.loginStart({username,password}));

  this.route.params.pipe(
    switchMap(() => this.store.select(selectAuthToken)), // Pratimo token$ Observable
    filter(token => !!token?.access_token), // Filtriramo samo ako postoji access_token
    take(1) // Prestajemo da pratimo nakon što dobijemo prvu vrednost
  ).subscribe(token => {
    // Ovde možete obraditi token koji sadrži access_token
    console.log(token?.access_token);
    // Onda možete preusmeriti korisnika ili uraditi nešto drugo
    if(token?.access_token)
    this.router.navigate(['/']);
  else
  alert('nema');
  },
  (error) => {
    // Ovde se obradjuje greška pri prijavi
    console.error(error);
    alert('DE CES'); // Prikaži upozorenje
  }
);
}
  else
  {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    const name = this.loginForm.value.name;
    const surname = this.loginForm.value.surname;
    const year = this.loginForm.value.year;
    const email = this.loginForm.value.email;
    const course = this.loginForm.value.course;
    this.service.signUp(name,surname,course,year,username,email,password).subscribe((response)=>{
      this.router.navigate(['login'])
    },
    (error)=>{console.log(error)});

  }
}
}
