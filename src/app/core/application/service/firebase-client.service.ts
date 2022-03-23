import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app"
import { DocumentData, Firestore, FirestoreError, getFirestore, QuerySnapshot } from "firebase/firestore"

import { collection, query, onSnapshot } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { from, map, Observable, Observer } from 'rxjs';

initializeApp({
  apiKey: 'AIzaSyC8dKarz-c8JrXWirpoL8yFWoPZ4Ami_Qg',
  authDomain: 'call-of-ukraine-app.firebaseapp.com',
  projectId: 'call-of-ukraine-app'
});

@Injectable({
  providedIn: 'root'
})
export class FirebaseClientService {

  private db: Firestore = null;

  constructor() {
    this.db = getFirestore();
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

    const observable = new Observable((observer: Observer<any>) => {
      onSnapshot(queryDocument, (snapshot) => onSnapshotNext(snapshot, observer), err => onSnapshotError(err, observer), () => onSnapshotComplete(observer));
    })

    return observable
  }


}
