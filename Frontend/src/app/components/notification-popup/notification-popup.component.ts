import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-notification-popup',
  templateUrl: './notification-popup.component.html',
  styleUrls: ['./notification-popup.component.scss']
})
export class NotificationPopupComponent {
constructor(@Inject(MAT_DIALOG_DATA) public data:{title:string,text:string},private dialogRef: MatDialogRef<NotificationPopupComponent>) {
  
}
close(){
  this.dialogRef.close();
}
}
