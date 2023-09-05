import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit{
  postForm:FormGroup = new FormGroup({});
  constructor(private fb:FormBuilder,private service:PostService){}
  ngOnInit() {
    this.postForm = this.fb.group({
      postContent: ['', Validators.required]
    });
  }
  handlePostClick(event: Event) {
    event.preventDefault(); 

    
    const postContent = this.postForm.get('postContent')?.value;

    
    console.log(postContent);
    this.service.createPost(postContent);
  }
}
