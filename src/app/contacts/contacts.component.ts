import { Component } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactItemComponent } from './contact-item/contact-item.component';
import { Contact } from './contact.model';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ContactListComponent, ContactDetailComponent, ContactItemComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  selectedContact!: Contact;
}
