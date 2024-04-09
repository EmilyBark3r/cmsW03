import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  //property for contact copy and original contact
  contact: Contact = null;
  originalContact: Contact;
  //array of contacts
  groupContacts: Contact[] = [];
  //booleans to check if editmode is on nd if contact has a group
  editMode: boolean = false;
  hasGroup: boolean = false;
  invalidGroupContact: boolean;

  //inject contact service, router and current route
  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // subscribe to changes in the route
    this.route.params.subscribe(
      (params: Params) => {
        // retrieve id from params
        const id = params['id'];

        // if id doesn't exist...
        if (!id) {
          // we are not in edit mode, exit
          this.editMode = false;
          return;
        }

        // if it does exist, retrieve contact by id from service
        this.contactService.getContact(id).subscribe(
          (data: { message: string, contact: Contact }) => {
            // extract the contact from the emitted data
            this.originalContact = data.contact;

            // if a contact with that id does not exist...
            if (!this.originalContact) {
              // exit
              return;
            }

            // if it does exist, then we are in edit mode
            this.editMode = true;
            // clone original contact into contact property
            this.contact = JSON.parse(JSON.stringify(this.originalContact));

            // check if contact has a group
            if (this.contact.group !== null && this.contact.group !== undefined) {
              // set has group to true
              this.hasGroup = true;
              // make a copy of the original contact's group property and store it in groupContacts
              this.groupContacts = [...this.contact.group];
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    );
  }


  onCancel() {
    this.router.navigate(['/contacts'], { relativeTo: this.route });
  }

  onSubmit(form: NgForm) {
    //get values from form
    const values = form.value;

    //use values to populate new contact object
    const newContact = new Contact(null, values.name, values.email, values.phone, values.imageUrl, this.groupContacts);

    //if edit mode is true
    if (this.editMode === true) {
      //then update
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      //if not, then add new
      this.contactService.addContact(newContact);
    }

    //navigate away after submiting
    this.router.navigate(['/contacts'], { relativeTo: this.route });
  }

  //method to determine if contact is already in contact group array
  isInvalidContact(newContact: Contact) {
    //if contact was NOT passed to the function
    if (!newContact) {
      //it is INVALID
      return true;
    }

    //if the contact being draged is the same of the contact where it's being dropped...
    if (newContact.id === this.contact.id) {
      //it is INVALID
      return true;
    }

    //loop through all contacts in the array...
    for (let i = 0; i < this.groupContacts.length; i++) {
      //check if the contact being dragged already exists in the array
      if (newContact.id === this.groupContacts[i].id) {
        //if so, is INVALID
        return true;
      }
    }

    //if passes all tests, then it is NOT invalid
    return false;
  }

  //method to add contact to group on dragg
  addToGroup($event: any) {
    //get data from event
    const selectedContact: Contact = $event.dragData;
    //check if that data is valid and store it
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    //if it is invalid..
    if (this.invalidGroupContact) {
      //exit
      return;
    }
    //if it is valid, push into array of contacts
    this.groupContacts.push(selectedContact);
    //set invalid variable to false
    this.invalidGroupContact = false;
  }

  //react to removing item
  onRemoveItem(idx: number) {
    //if the index (position of contact) is not in the array...
    if (idx < 0 || idx >= this.groupContacts.length) {
      //exit
      return;
    }

    //if it is in the array, delete only that contact
    this.groupContacts.splice(idx, 1);
    //set invalid to false
    this.invalidGroupContact = false;
  }

}