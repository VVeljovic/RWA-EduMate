import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-grade-popup',
  templateUrl: './grade-popup.component.html',
  styleUrls: ['./grade-popup.component.scss']
})
export class GradePopupComponent {
constructor(@Inject(MAT_DIALOG_DATA)public data:{postId:number},private postService:PostService){}
selectedRating:number = 0;
rate()
{
  console.log(this.selectedRating);
  this.postService.ratePost(this.data.postId,this.selectedRating);
}
}
