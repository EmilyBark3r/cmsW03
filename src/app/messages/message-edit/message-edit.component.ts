import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../message.service';


@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  //references to the DOM
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  //output event emitter
  @Output() addMessageEvent = new EventEmitter<Message>();
  //current sender
  currentSender: string = '2';

  //inject message service
  constructor(private messageService: MessagesService) { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const subject = this.subject.nativeElement.value;
    const msgText = this.msgText.nativeElement.value;

    const message = new Message('3', subject, msgText, this.currentSender);

    // this.addMessageEvent.emit(message);
    this.messageService.addMessage(message)
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}