import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;

  //inject contact service, route and router
  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // subscribe to current active route and get the id from param
    this.route.params.subscribe(
      (params: Params) => {
        // retrieve contact that has id from params
        this.contactService.getContact(params['id']).subscribe(
          (data: { message: string, contact: Contact }) => {
            // store the received contact in the contact property
            this.contact = data.contact;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    );
  }


  onDelete() {
    //delete using service
    this.contactService.deleteContact(this.contact);
    //navigate to contact list relative to this route
    // this.router.navigate(['/contacts'], { relativeTo: this.route });
    this.router.navigateByUrl('/contacts');
  }

}