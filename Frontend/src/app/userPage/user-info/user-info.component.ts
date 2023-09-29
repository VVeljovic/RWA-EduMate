import { Component,OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { selectUser } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit{
  selectedSection:string = 'about';
  user$:Observable<User|null>|undefined;
  imagePath:string ='';
  constructor(private store:Store,private userService:UserService){}
  editedText: string = "Tekst koji možete uređivati klikom na njega.";
  ngOnInit():void{
    this.user$=this.store.select(selectUser);
    this.user$.subscribe(user=>{
      if(user && user.image){
        this.userService.getProfileImage(user.image).subscribe(
          (blobData:Blob)=>{
            const objectUrl = URL.createObjectURL(blobData);
            this.imagePath=objectUrl;
          }
        )
      }
    })
  }
  updateSelectedSection(section:string){
    this.selectedSection=section;
    console.log(this.selectedSection);
  }
}
