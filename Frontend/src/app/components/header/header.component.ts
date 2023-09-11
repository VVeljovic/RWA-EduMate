import { Component, OnInit } from '@angular/core';
import { Observable,filter,map } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/store/auth/auth.selector';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as UserImageActions from '../../store/profileImage/image.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$: Observable<User | null> | undefined;
  userProfileImage: Blob | null = null;

  constructor(private store: Store,private userService : UserService) {}

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
    this.user$.subscribe(user => {
      console.log('Korisnik:', user);
      if (user && user.image) {
        
        this.store.dispatch(
          UserImageActions.loadUserProfileImage({ imageName: user.image })
        );
      }
    });
  }

getImageUrl(): string {
  if (this.userProfileImage) {
    const blob = new Blob([this.userProfileImage], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  }
  return '';
}
}