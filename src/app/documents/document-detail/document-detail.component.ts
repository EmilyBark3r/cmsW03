import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { NgIf } from '@angular/common';
// import { Params } from '@angular/router';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'app-document-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent {
  @Input() document!: Document;

  // ngOnInit(): void {
  //   this.nativeWindow - this.winRef.getNativeWindow();
  //   this.route.params.subscribe((params: Params) => {
  //     this.document = this.docService.getDocument(params['id']);
  //   });
  // }

  // onView() {
  //   if (this.document.url) this.nativeWindow.open(this.document.url);
  // }

  // onDelete() {
  //   this.docService.deleteContact(this.document);
  //   this.router.navigate(['../'], { relativeTo: this.route });
  // }
}
