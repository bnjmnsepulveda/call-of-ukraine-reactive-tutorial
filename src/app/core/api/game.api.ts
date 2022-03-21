import { Injectable } from "@angular/core";
import { from, map, of } from "rxjs";
import { AttackRequestDTO } from "../application/dto/AttackRequestDTO";
import { RussianCity } from "../domain/model/RussianCity";
import { Soldier } from "../domain/model/Soldier";
// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app"
import { Firestore, getFirestore } from "firebase/firestore"
import { collection, addDoc,query, where, getDocs, getDoc } from "firebase/firestore"; 
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

}