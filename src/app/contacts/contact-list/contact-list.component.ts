import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  // Property for search term
  term: string = '';

  // List of contacts
  contacts: Contact[] = [];

  // Subscription property
  private subscription: Subscription;

  // Inject contact service
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    // Subscribe to changes on the contact list, store in subscription
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
      });

    // Get contact list
    this.contactService.getContacts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // Method to react on key press for search
  onKeyPress(value: string) {
    this.term = value.toString();
  }
}
