import { TestBed } from '@angular/core/testing';
import { Document } from './document.model';
import { DocumentsService } from './documents.service';

describe('DocumentsService', () => {
  let documentService: DocumentsService;
  const mockDocuments: Document[] = [
    {
      id: '1',
      name: 'document 1',
      url: 'documenturl.com',
      description: 'document 1'
    },
    {
      id: '2',
      name: 'document 2',
      url: 'documenturl.com',
      description: 'document 2'
    },
    {
      id: '3',
      name: 'document 3',
      url: 'documenturl.com',
      description: 'document 3'
    }
  ]
  beforeEach(() => {
    documentService = new DocumentsService();
    documentService['documents'] = mockDocuments.slice();
  });

  it('should delete a document', () => {
    const documentToDelete: Document = mockDocuments[0];
    const initialLength = documentService['documents'].length;

    documentService.deleteDocument(documentToDelete);

    expect(documentService['documents'].length).toEqual(initialLength - 1);
  });
});
