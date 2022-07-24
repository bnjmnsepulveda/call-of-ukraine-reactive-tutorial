import { map, Observable, of, Subject } from "rxjs";
import { Attack } from "../../domain/model/Attack";
import { DocumentProvider } from "../providers/document.provider";

export interface User {
    id: string
    name: string;
}

export class InMemoryDocumentService implements DocumentProvider{
    
    private users: User[] = [
        {
            id: 'a',
            name: 'benjamin'
        },
        {
            id: 'b',
            name: 'red-lion'
        }
    ]
    private attacks: Attack[] = []

    private attackSubject = new Subject();

    existsDocument(collectionName: string, id: string): Observable<boolean> {
        let exists = false
        if (collectionName === 'soldiers') {
            exists = this.users.find(u => u.id === id) ? true : false
        }
        return of(false);
    }

    saveDocument(collectionName: string, entity: any): Observable<any> {
        console.log('save document' + collectionName, entity)
        let saved = false
        if (collectionName ==='attacks') {
            this.attacks.push(entity)
            this.attackSubject.next(entity)
            
            saved = true
        }
        if (collectionName === 'soldiers') {
            this.users.push(entity)
            saved = true
        }
        if (!saved) {
            throw new Error(`Invalid collection name ${collectionName}`)
        }
        return of(entity)
    }

    onDocumentAdded(collectionName: string, entityAdapter: (data: any) => any): Observable<any> {
        if (collectionName === 'attacks') {
            return this.attackSubject.asObservable().pipe(
                map(x => entityAdapter(x))
            )
        }
        return null
    }

}