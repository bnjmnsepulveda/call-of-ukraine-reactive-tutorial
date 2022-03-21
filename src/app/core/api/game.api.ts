import { Injectable } from "@angular/core";
import { from, map, of } from "rxjs";
import { AttackRequestDTO } from "../application/dto/AttackRequestDTO";
import { RussianCity } from "../domain/model/RussianCity";
import { Soldier } from "../domain/model/Soldier";
// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { collection, addDoc,query, where, getDocs } from "firebase/firestore"; 
import { doc, getDoc } from "firebase/firestore";
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyC8dKarz-c8JrXWirpoL8yFWoPZ4Ami_Qg',
  authDomain: 'call-of-ukraine-app.firebaseapp.com',
  projectId: 'call-of-ukraine-app'
});

@Injectable({
    providedIn: 'root'
})
export class GameAPI {

    private db: any = null;

    constructor() {
        this.db = getFirestore();
    }

    existsSoldierName(name: string) {
        const querySearch = query(collection(this.db, 'soldiers'), where('name', '==', name));
        const querySnapshot = getDocs(querySearch).then(d => !d.empty);
        return from(querySnapshot)
    }

    saveSoldier(soldier: Soldier) {
        const promise = addDoc(collection(this.db, 'soldiers'), soldier).then(saved => saved.id)
        return from(promise).pipe(
            map(id => {
                soldier.id = id
                return soldier
            })
        )
    }

}