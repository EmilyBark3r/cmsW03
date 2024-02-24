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
  // @Input() contact!: Contact;
  contact!: Contact;

  constructor(
    private contactService: ContactsService,
  ) {}

  onDelete() {
    this.contactService.deleteContact(this.contact);
  }
}
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Params, Router } from '@angular/router';
// import { Contact } from '../contact.model';
// import { ContactsService } from '../contacts.service';

// @Component({
//     selector: 'app-contact-detail',
//     standalone: true,
//     imports: [ContactsService],
//     templateUrl: './contact-detail.component.html',
//     styleUrl: './contact-detail.component.css'
//   })

// export class ContactDetailComponent implements OnInit {
//   contact!: Contact;

//   constructor(
//     private contactService: ContactService,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     this.route.params.subscribe((params: Params) => {
//       this.contact = this.contactService.getContact(params['id']);
//     });
//   }

//   onDelete() {
//     this.contactService.deleteContact(this.contact);
//     this.router.navigate(['../'], { relativeTo: this.route });
//   }
// }