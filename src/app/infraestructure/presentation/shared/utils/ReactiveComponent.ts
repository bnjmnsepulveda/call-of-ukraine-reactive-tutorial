import { ElementRef } from "@angular/core";
import { concatMap, from, of, Subscription, delay, fromEvent } from "rxjs";

export class ReactiveComponent {
    
    private subscriptions: Subscription[] = []

    addSubscription(...subscriptions: Subscription[]) {
        subscriptions.forEach(subscription => this.subscriptions.push(subscription))   
    }

    unsubscribeComponent() {
        this.subscriptions.forEach(sub => sub.unsubscribe())
    }
    
    delayItems(items: any[], timeDelay: number) {
        return from(items).pipe(
            concatMap(item => of(item).pipe(delay(timeDelay))),
        )
    }

    fromElementRefEvent(elementRef: ElementRef, event: string) {
        return fromEvent(elementRef.nativeElement, event)
    }
    
}