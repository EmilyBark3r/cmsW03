import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { NgIf } from '@angular/common';
// import { Params } from '@angular/router';
import { DocumentService } from '../documents.service';

@Component({
  selector: 'app-document-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent {
  @Input() document!: Document;

  constructor(
    private documentService: DocumentService,
  ) { }

  onDelete() {
    this.documentService.deleteDocument(this.document);
  }
}
