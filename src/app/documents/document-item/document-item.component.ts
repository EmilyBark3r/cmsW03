import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-document-item',
  standalone: true,
  imports: [NgFor],
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css'
})
export class DocumentItemComponent {
  @Input() document!: Document;
}
