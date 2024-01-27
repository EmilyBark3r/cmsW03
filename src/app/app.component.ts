import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentsComponent } from './documents/documents.component';
import { MessageComponent } from './messages/message.component';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ContactsComponent, CommonModule, CommonModule, DocumentsComponent, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cms';

  selectedFeature!: string;

  switchView(selectedFeature: string) {
    if (this.selectedFeature?.toUpperCase() !== selectedFeature.toUpperCase()) {
      this.selectedFeature = selectedFeature;
    }
  }
}

