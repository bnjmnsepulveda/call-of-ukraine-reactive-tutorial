import { Observable } from "rxjs";

export interface DocumentProvider {
    existsDocument(collectionName: string, id: string): Observable<boolean>;
    saveDocument(collectionName: string, entity: any): Observable<any>;
    onDocumentAdded(collectionName: string, entityAdapter: (data: any) => any): Observable<any>;
}
