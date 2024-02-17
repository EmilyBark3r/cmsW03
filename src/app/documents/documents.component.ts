import { Component } from '@angular/core';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { DocumentEditComponent } from './document-edit/document-edit.component';
import { Document } from './document.model';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { MOCKDOCUMENTS } from '../documents/MOCKDOCUMENTS.ts';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [DocumentListComponent, DocumentDetailComponent, DocumentEditComponent, NgIf, RouterModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {
  selectedDocument!: Document;
  private documents: Document[] = [];

  constructor() {
    // this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | undefined {
    return this.documents.find((d) => d.id === id);
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
