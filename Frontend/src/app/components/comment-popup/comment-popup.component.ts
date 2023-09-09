import { Component,Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/comment.model';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-comment-popup',
  templateUrl: './comment-popup.component.html',
  styleUrls: ['./comment-popup.component.scss']
})
export class CommentPopupComponent  {
  public comment$ : Observable<Comment[]>;
  commentForm:FormGroup=new FormGroup({});
constructor(@Inject(MAT_DIALOG_DATA) public data:{postId:number},private service: CommentService,private fb:FormBuilder){
  this.commentForm = this.fb.group({
    commentText: ['', Validators.required] 
  });
  this.comment$ = this.service.getComments(this.data.postId);
  this.comment$.subscribe(comment=>{
    console.log(comment);
  })
}
sendComment() {
  const commentControl = this.commentForm.get('commentText');

  if (commentControl) {
    const commentText = commentControl.value;
    console.log(commentText);
 
  }
}
}
