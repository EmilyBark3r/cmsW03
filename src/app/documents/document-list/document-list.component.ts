import { Component, EventEmitter, Output } from '@angular/core';
import { DocumentItemComponent } from '../document-item/document-item.component';
import { Document } from '../document.model';
import { NgFor } from '@angular/common';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [DocumentItemComponent, NgFor],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  documents: Document[] = [];

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

  constructor(private DocumentsService: DocumentsService) { }

  ngOnInit(): void {
    this.documents = this.DocumentsService.getDocuments();
  }
}