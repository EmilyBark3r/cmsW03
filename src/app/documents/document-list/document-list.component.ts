import { Component } from '@angular/core';
import { DocumentItemComponent } from '../document-item/document-item.component';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [DocumentItemComponent],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {

}
