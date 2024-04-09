import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documents: Document[] = [];
  maxDocumentId: number;
  documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) { }

  getDocuments() {
    const httpObservable: Observable<{ message: string, documents: Document[] }> = this.http.get<{ message: string, documents: Document[] }>('http://localhost:3000/documents');

    httpObservable.subscribe(
      (documentData) => {
        this.documents = documentData.documents;
        this.documents.sort((a, b) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0);
        this.documentListChangedEvent.next(this.documents.slice());
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const document of this.documents) {
      const currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const strDocument = JSON.stringify(document);

    this.http.post<Document[]>('http://localhost:3000/documents', strDocument, { headers: headers })
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error) => {
          console.log(error);
        }
      );
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const strDocument = JSON.stringify(newDocument);

    this.http.patch<Document[]>('http://localhost:3000/documents/' + originalDocument.id
      , strDocument
      , { headers: headers })
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    this.http.delete<Document[]>('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error) => {
          console.log(error);
        }
      );
  }

}
