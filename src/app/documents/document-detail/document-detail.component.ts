import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-document-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent {
  @Input() document!: Document;
  
}
