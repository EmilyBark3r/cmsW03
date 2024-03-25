// import { Component } from '@angular/core';
// import { MessageItemComponent } from './message-item/message-item.component';
// import { MessageEditComponent } from './message-edit/message-edit.component';
// import { MessageListComponent } from './message-list/message-list.component';

// import { Message } from './message.model';
// import { MessageService } from './message.service';

// @Component({
//   selector: 'app-message',
//   standalone: true,
//   imports: [MessageItemComponent, MessageEditComponent, MessageListComponent],
//   templateUrl: './message.component.html',
//   styleUrls: ['./message.component.css']
// })
// export class MessageComponent {
//   messages: Message[] = [];

//   constructor(private messageService: MessageService) {}

//   ngOnInit(): void {
//     this.messages = this.messageService.getMessages();
//     this.messageService.messageChangedEvent.subscribe((messages: Message[]) => {
//       this.messages = messages;
//     });
//   }

//   onAddMessage(message: Message) {
//     this.messages.push(message);
//   }
// }
