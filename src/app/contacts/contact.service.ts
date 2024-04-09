import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;
  contacts: Contact[] = [];

  constructor(private http: HttpClient) {
    this.maxContactId = this.getMaxId();
  }

  getContacts() {
    this.http.get<{ message: string, contacts: Contact[] }>('http://localhost:3000/contacts')
      .subscribe(
        (responseData: { message: string, contacts: Contact[] }) => {
          this.contacts = responseData.contacts;
          this.contacts.sort((a, b) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0);
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getContact(id: string) {
    return this.http.get<{ message: string, contact: Contact }>('http://localhost:3000/contacts/' + id);
  }

  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    newContact.id = '';
    const strContact = JSON.stringify(newContact);
    this.http.post('http://localhost:3000/contacts', strContact, { headers: headers })
      .subscribe(
        (responseData: any) => {
          this.contacts = responseData;
          this.contactChangedEvent.next(this.contacts.slice());
        }
      );
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const strContact = JSON.stringify(newContact);
    this.http.patch('http://localhost:3000/contacts/' + originalContact.id, strContact, { headers: headers })
      .subscribe(
        (responseData: any) => {
          this.contacts = responseData;
          this.contactChangedEvent.next(this.contacts.slice());
        }
      );
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (responseData: any) => {
          this.contacts = responseData;
          this.contactChangedEvent.next(this.contacts.slice());
        }
      );
  }
}
