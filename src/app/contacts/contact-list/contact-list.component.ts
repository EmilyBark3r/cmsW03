import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../contact.model';
import { NgFor } from '@angular/common';
import { ContactItemComponent } from '../contact-item/contact-item.component';
import { ContactsService } from '../contacts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [NgFor, ContactItemComponent],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  contacts: Contact[] = [];

  @Output() selectedContactEvent = new EventEmitter<Contact>();

  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }

  constructor(private contactService: ContactsService) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
