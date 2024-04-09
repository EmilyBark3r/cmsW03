import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { DocumentsService } from '../document.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  //variable for original unedited document
  originalDocument: Document;
  //variable for edited document;
  document: Document;
  //variable for edit mode
  editMode: boolean = false;

  //iject docservice, router and route
  constructor(private documentService: DocumentsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //subscribe to changes in the route parameters
    this.route.params.subscribe(
      (params: Params) => {
        //get id from parameters
        const id = params['id'];

        //if id doesnt exist on parameters..
        if (!id) {
          //set edit mode to false and exit..
          this.editMode = false;
          return;
        }
        //if it exists on params..
        //get and store the doc with that id in original document prop
        this.originalDocument = this.documentService.getDocument(id);

        //if not document is found with that id...
        if (!this.originalDocument) {
          //exit function
          return;
        }

        //if it is found...
        //set edit mode to true and store a copy of the original document
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    )
  }

  onCancel() {
    this.router.navigate(['/documents'], { relativeTo: this.route });
  }

  onSubmit(form: NgForm) {
    //get values from form
    const values = form.value;

    //create a document with the values from form
    const newDocument = new Document(null, values.name, values.description, values.documentUrl, null);

    //if we are on edit mode...
    if (this.editMode === true) {
      //we update
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      //we add a new one
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents'], { relativeTo: this.route });
  }
}