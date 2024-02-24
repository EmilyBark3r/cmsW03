import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
  @Input() contact!: Contact;
  // contact!: Contact;

  constructor(
    private contactService: ContactsService,
  ) {}

  onDelete() {
    this.contactService.deleteContact(this.contact);
  }
}
