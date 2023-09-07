import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CommentPopupComponent } from './components/comment-popup/comment-popup.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  constructor(private dialogRef:MatDialog)
  {}
  openDialog(){
    this.dialogRef.open(CommentPopupComponent);
  }
}
