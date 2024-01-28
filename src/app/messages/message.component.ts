import { Component } from '@angular/core';
import { MessageItemComponent } from './message-item/message-item.component';
import { MessageEditComponent } from './message-edit/message-edit.component';
import { MessageListComponent } from './message-list/message-list.component';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [MessageItemComponent, MessageEditComponent, MessageListComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {

}
