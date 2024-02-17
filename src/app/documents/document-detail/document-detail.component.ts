import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-document-detail',
  standalone: true,
  imports: [NgIf, RouterModule],
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent {
  @Input() document!: Document;
  
}
