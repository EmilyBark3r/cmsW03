import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact | undefined {
    return this.contacts.find((c) => c.id === id);
    // This also works but the return find is a lot shorter of code to right
    /*
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return undefined;
    */
  }
}
