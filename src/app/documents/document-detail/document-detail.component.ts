import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../document.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WindRefService } from 'src/app/win-ref.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  //document property
  document: Document;

  //property for window
  nativeWindow: any;

  //inject document service, router and activated route, and window service
  constructor(private documentService: DocumentsService, private router: Router, private route: ActivatedRoute, private windowRefService: WindRefService) {
    this.nativeWindow = windowRefService.getNative();
  }

  ngOnInit(): void {
    //subscribe to the params of the current active route
    this.route.params.subscribe(
      (params: Params) => {
        //get the specific document (passing id param) and store it in document
        this.document = this.documentService.getDocument(params['id']);
      }
    )
  }

  //method to view document
  onView() {
    //if the document exists..
    if (this.document.url) {
      //open it in another window
      this.nativeWindow.open(this.document.url);
    }
  }

  //method to delete
  onDelete() {
    //delete using service
    this.documentService.deleteDocument(this.document);
    //navigate to /documents relative to this route
    this.router.navigate(['/documents'], { relativeTo: this.route });
  }
}