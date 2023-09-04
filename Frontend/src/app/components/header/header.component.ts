import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import {Store} from '@ngrx/store';
import { selectUser } from 'src/app/store/auth/auth.selector';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
 user$:Observable<User|null>|undefined;
constructor(private store:Store){}
ngOnInit(): void {
  this.user$ = this.store.select(selectUser);
}
}
