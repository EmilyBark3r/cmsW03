import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ContactsFilterPipe'
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: any[], term: string): any[] {
    if (!contacts || !term) {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(term.toLowerCase())
    );
  }
}
