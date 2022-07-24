import { initializeApp } from "firebase/app"
import { doc, setDoc, DocumentData, Firestore, FirestoreError, getDoc, getFirestore, QuerySnapshot, collection, query, onSnapshot } from "firebase/firestore"
import { from, map, Observable, Observer, share } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DocumentProvider } from './providers/document.provider';


initializeApp({
  apiKey: environment.firebase.apiKey,
  authDomain: environment.firebase.authDomain,
  projectId: environment.firebase.projectId
});

export class FirebaseClientService implements DocumentProvider {

  private db: Firestore = null;

  constructor() {
    this.db = getFirestore();
  }

  existsDocument(collectionName: string, id: string) {
    const docRef = doc(this.db, collectionName, id);
    const docSnap = getDoc(docRef);
    return from(docSnap.then(d => d.exists()))
  }

  saveDocument(collectionName: string, entity: any) {
    const promise = setDoc(doc(this.db, collectionName, entity.id), entity)
    return from(promise).pipe(
      map(() => entity)
    )
  }

  onDocumentAdded(collectionName: string, entityAdapter: (data: DocumentData) => any) {

    const queryDocument = query(collection(this.db, collectionName));

    const onSnapshotNext = (snapshot: QuerySnapshot<DocumentData>, observer: Observer<any>) => {
      snapshot.docChanges()
        .filter(change => change.type === 'added')
        .map(change => change.doc.data())
        .map(data => entityAdapter(data))
        .forEach(entity => observer.next(entity))
    }

    const onSnapshotError = (error: FirestoreError, observer: Observer<any>) => {
      observer.error(error)
    }

    const onSnapshotComplete = (observer: Observer<any>) => {
      observer.complete()
    }

    const documentAdded$ = new Observable((observer: Observer<any>) => {
      onSnapshot(queryDocument, (snapshot) => onSnapshotNext(snapshot, observer), err => onSnapshotError(err, observer), () => onSnapshotComplete(observer));
    })

    return documentAdded$.pipe(
      share()
    )
    
  }


}
