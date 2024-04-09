import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messageListChangedEvent = new Subject<Message[]>();
  messages: Message[] = [];

  constructor(private http: HttpClient) { }

  getMessages() {
    this.http.get<{ message: string, messages: Message[] }>('http://localhost:3000/messages')
      .subscribe(
        (messagesData: { message: string, messages: Message[] }) => {
          this.messages = messagesData.messages;
          this.messages.sort((a, b) => (a.id < b.id) ? 1 : (a.id > b.id) ? -1 : 0)
          this.messageListChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.log(error);
        }
      )
  }

  getMessage(id: string): Message {
    return this.messages.find(message => message.id === id) || null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    newMessage.id = '';
    const strMessage = JSON.stringify(newMessage);

    this.http.post<Message[]>('http://localhost:3000/messages', strMessage, { headers: headers })
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.messageListChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
