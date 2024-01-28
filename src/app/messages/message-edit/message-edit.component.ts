import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from '../messages.model';

@Component({
  selector: 'app-message-edit',
  standalone: true,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})

export class MessageEditComponent implements OnInit {

  @Output() addMessageEvent = new EventEmitter<Message>();

  subjectValue: string = 'Just saying hello';
  msgTextValue: string = 'Hello';
  currentSender: string = 'Emily Barker';

  constructor() { }

  ngOnInit(): void { }

  onSendMessage() {
    const message = new Message('1', this.subjectValue, this.msgTextValue, this.currentSender);
    this.addMessageEvent.emit(message);
  }

  onClear() {
    this.subjectValue = '';
    this.msgTextValue = '';
  }

}
