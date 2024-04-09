
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  //event emitter
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  //subscription property
  private subscription: Subscription;

  //array/list of dummy documents
  documents: Document[] = [];

  //inject document srvice
  constructor(private documentService: DocumentsService) {

  }

  ngOnInit(): void {

    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    )
    this.documentService.getDocuments();
  }

  // onSelectedDocument(document: Document) {
  //   this.selectedDocumentEvent.emit(document);
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
