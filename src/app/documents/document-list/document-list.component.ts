import { Component, EventEmitter, Output } from '@angular/core';
import { DocumentItemComponent } from '../document-item/document-item.component';
import { Document } from '../document.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [DocumentItemComponent, NgFor],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter();

  documents = [
    new Document('1', 'DummyDocument1', 'This is DummyDocument 1.', 'https://www.byui.com/1'),
    new Document('2', 'DummyDocument2', 'This is DummyDocument 2.', 'https://www.byui.com/2'),
    new Document('3', 'DummyDocument3', 'This is DummyDocument 3.', 'https://www.byui.com/3'),
    new Document('4', 'DummyDocument4', 'This is DummyDocument 4.', 'https://www.byui.com/4')
  ]

  onSelectedDocument(document: Document) {
    console.log('click');
    this.selectedDocumentEvent.emit(document);
  }
  
}
