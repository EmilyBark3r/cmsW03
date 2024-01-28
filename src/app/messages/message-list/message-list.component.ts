import { Component, OnInit } from '@angular/core';
import { MessageItemComponent } from '../message-item/message-item.component';
import { MessageEditComponent } from '../message-edit/message-edit.component';
import { Message } from '../messages.model';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [MessageItemComponent, MessageEditComponent, NgFor],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('1', 'message 1', 'This is the first message.', 'Daniel'),
    new Message('2', 'message 2', 'This is the second message.', 'Johnny'),
    new Message('3', 'message 3', 'This is the third message.', 'Carlos'),
  ];

  constructor() { }

  ngOnInit(): void { }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
