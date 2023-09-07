import { Component,Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/comment.model';
@Component({
  selector: 'app-comment-popup',
  templateUrl: './comment-popup.component.html',
  styleUrls: ['./comment-popup.component.scss']
})
export class CommentPopupComponent implements OnInit {
  public comment$ : Observable<Comment[]>;
constructor(@Inject(MAT_DIALOG_DATA) public data:{postId:number},private service: CommentService){
  this.comment$ = this.service.getComments(this.data.postId);
  this.comment$.subscribe(comment=>{
    console.log(comment);
  })
}
ngOnInit(){
  // const postId = this.data.postId;
  // this.service.getComments(postId).subscribe(comments=>{
  //   console.log(comments);
  // })
}
}
