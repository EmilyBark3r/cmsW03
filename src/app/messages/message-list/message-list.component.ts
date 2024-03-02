import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageItemComponent } from '../message-item/message-item.component';
import { MessageEditComponent } from '../message-edit/message-edit.component';
import { Message } from '../message.model';
import { NgFor } from '@angular/common';
// import { MessagesService } from '../message.service';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [MessageItemComponent, MessageEditComponent, NgFor],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = [];

  @Output() selectedMessageEvent = new EventEmitter<Message>();

  onAddMessage(message: Message) {
    this.selectedMessageEvent.emit(message);
  }

  // constructor(private MessagesService: MessagesService) { }

  // ngOnInit(): void {
  //   this.messages = this.MessagesService.getMessages();
  // }

  // onAddMessage(message: Message) {
  //   this.messages.push(message);
  // }
}
