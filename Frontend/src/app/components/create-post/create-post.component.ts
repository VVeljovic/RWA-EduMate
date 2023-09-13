import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { Store } from '@ngrx/store';
import * as PostActions from '../../store/posts/post.actions';
import { Post } from 'src/app/models/post.model';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { selectUser } from 'src/app/store/auth/auth.selector';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit{
  postForm:FormGroup = new FormGroup({});
  selectedImage: File | null = null;
  constructor(private fb:FormBuilder,private service:PostService,private store:Store){}
  ngOnInit() {
    this.postForm = this.fb.group({
      postContent: ['', Validators.required]
    });
  }
  handlePostClick(event: Event) {
    event.preventDefault(); 
    const postContent = this.postForm.get('postContent')?.value;
  
    let user$ :Observable<User|null>|undefined;
    user$ = this.store.select(selectUser);
    user$.subscribe((user) => {
      if (user) {
       const post : Post = {
        body:postContent,
        id:Math.random(),
        author:user
       }
       this.store.dispatch(PostActions.createPost({post}));
      } else {
        // user je null ili undefined
        console.log('Nema dostupnih korisnika.');
      }
    });
    if(this.selectedImage!=null)
       {this.store.dispatch(PostActions.uploadPostImage({image:this.selectedImage})); this.selectedImage=null;}
  
  }
  handleGalleryImageSelect(event: any): any {
    const selectedFile = event.target.files[0];
    
    if (selectedFile) {
      this.selectedImage=selectedFile;
      console.log('Izabrana slika iz galerije:', selectedFile);
    }
  }
}
