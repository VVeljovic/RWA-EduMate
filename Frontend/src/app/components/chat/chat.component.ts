import { Component,OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { User } from 'src/app/models/user.model';
import { Chat } from 'src/app/models/chat.model';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/store/auth/auth.selector';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
  @ViewChild('form')
  form!: NgForm;
  newMessage$!: Observable<string>;
messages:Chat[]=[];
users:string[]=[];

//users:User[]=[];
constructor(private chatService:ChatService,private store:Store){}
ngOnInit() {
  this.chatService.getMessages().subscribe((newMessages: Chat[]) => {
    // Konvertujte objekte Chat u stringove i dodajte ih u niz messages
    this.messages = newMessages.map((message) => message);
    
  });
   this.chatService.getNewMessage().subscribe((message:Chat)=>{
    console.log(message);
    this.messages.push(message);
  })
 
}
onSubmit(){
const {message}=this.form.value;
if(!message)return;
const user$ = this.store.select(selectUser).subscribe(user=>{
  this.chatService.sendMessage(message,user?.username);
  this.form.reset();
})
}
}
