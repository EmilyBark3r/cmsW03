import { Component, Input } from '@angular/core';
import { Message } from '../messages.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent {

  @Input() message!: Message;

}
