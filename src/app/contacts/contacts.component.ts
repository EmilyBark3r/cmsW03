import { Component } from '@angular/core';

import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactItemComponent } from './contact-item/contact-item.component';
import { Contact } from './contact.model';
import { ContactsService } from './contacts.service';

import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ContactListComponent, ContactDetailComponent, ContactItemComponent, NgIf],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})

export class ContactsComponent {
  selectedContact!: Contact;

  // constructor(private contactService: ContactsService) { }

  ngOnInit(): void { }
}

