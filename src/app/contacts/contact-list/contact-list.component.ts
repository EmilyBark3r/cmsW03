import { Component } from '@angular/core';
import { Contact } from '../contact.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  contacts: Contact[] = [
    new Contact("1", "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771", "../../assets/images/jacksonk.jpg", null),
    new Contact("2", "Rex Barzee", "barzeer@byui.edu", "208-496-3768", "../../assets/images/barzeer.jpg", null),
  ];
}
