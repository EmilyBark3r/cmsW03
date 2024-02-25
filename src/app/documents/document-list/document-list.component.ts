import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy
} from '@angular/core';
import { DocumentItemComponent } from '../document-item/document-item.component';
import { Document } from '../document.model';
import { NgFor } from '@angular/common';
import { DocumentService } from '../documents.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [DocumentItemComponent, NgFor],
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})

export class DocumentListComponent implements OnInit, OnDestroy {
  @Output() selectedDocumentEvent = new EventEmitter();
  subscription!: Subscription;
  // private igChangeSub: Subscription | null = null;

  documents: Document[] = [];

  constructor(private documentService: DocumentService) { }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
