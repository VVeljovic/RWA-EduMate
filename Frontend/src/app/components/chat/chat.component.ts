import { Component,OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { User } from 'src/app/models/user.model';
import { Chat } from 'src/app/models/chat.model';
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
//users:User[]=[];
constructor(private chatService:ChatService){}
ngOnInit() {
  this.chatService.getMessages().subscribe((newMessages: Chat[]) => {
    // Konvertujte objekte Chat u stringove i dodajte ih u niz messages
    this.messages = newMessages.map((message) => message.text);
  });
   this.chatService.getNewMessage().subscribe((message:string)=>{
    this.messages.push(message);
  })
 
}
onSubmit(){
const {message}=this.form.value;
if(!message)return;
this.chatService.sendMessage(message);
this.form.reset();
}
}
