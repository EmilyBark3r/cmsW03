import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  //inject message service
  constructor(private messageService: MessagesService) {

  }

  ngOnInit(): void {

    this.messageService.messageListChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    });

    this.messageService.getMessages();
  }

  onAddMessage(message: Message) {
    //push message to array of messages
    this.messages.push(message);
  }

}