import { Component,OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
  @ViewChild('form')
  form!: NgForm;
  newMessage$!: Observable<string>;
messages:string[]=[];
users:User[]=[];
constructor(private chatService:ChatService){}
ngOnInit() {
   this.chatService.getNewMessage().subscribe((message:string)=>{
    this.messages.push(message);
  })
  this.chatService.getUsersOnSameCourse().subscribe((users:User[])=>{
   
    this.users=users;
  })
}
onSubmit(){
const {message}=this.form.value;
if(!message)return;
this.chatService.sendMessage(message);
this.form.reset();
}
}