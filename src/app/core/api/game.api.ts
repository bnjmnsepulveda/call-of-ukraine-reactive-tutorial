import { Injectable } from "@angular/core";
import { from, map, Observable, Observer, of } from "rxjs";
import { RussianCity } from "../domain/model/RussianCity";
import { Soldier } from "../domain/model/Soldier";
// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app"
import { Firestore, getFirestore } from "firebase/firestore"

import { collection, addDoc, query, where, getDocs, getDoc, onSnapshot } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { Attack } from "../domain/model/Attack";
const firebaseApp = initializeApp({
    apiKey: 'AIzaSyC8dKarz-c8JrXWirpoL8yFWoPZ4Ami_Qg',
    authDomain: 'call-of-ukraine-app.firebaseapp.com',
    projectId: 'call-of-ukraine-app'
});

@Injectable({
    providedIn: 'root'
})
export class GameAPI {

    private db: Firestore = null;

    constructor() {
        this.db = getFirestore();
    }

    private saveEntity(collectionName: string, entity: any) {
        const promise = setDoc(doc(this.db, collectionName, entity.id), entity)
        return from(promise).pipe(
            map(() => entity)
        )
    }

    existsSoldierName(name: string) {
        const docRef = doc(this.db, 'soldiers', name);
        const docSnap = getDoc(docRef);
        return from(docSnap.then(d => d.exists()))
    }

    saveSoldier(soldier: Soldier) {
        return this.saveEntity('soldiers', soldier)
    }

    saveRusssianCity(russianCity: RussianCity) {
        return this.saveEntity('russianCities', russianCity)
    }

    saveAttack(attack: Attack) {
        return this.saveEntity('attacks', attack)
    }

    getAttacks() {
        const q = query(collection(this.db, 'attacks'));
        const documents = getDocs(q)
            .then(snapshot => snapshot.docs.map(d => d.data()))
            .then(docs => docs.map(d => ({
                soldier: d['soldier'],
                city: d['city'],
                weapon: d['weapon']
            }) as Attack));
        return from(documents)
    }

    getRealtimeAttacks() {
        const q = query(collection(this.db, 'attacks'));
        const observable = new Observable((observer: Observer<Attack>) => {
            onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === 'added') {
                        const data = change.doc.data()
                        observer.next(({
                            soldier: data['soldier'],
                            city: data['city'],
                            weapon: data['weapon']
                        }) as Attack);
                    }
                });
            },
                err => observer.error(err),
                () => observer.complete()
            );
        })
        return observable
    }

}