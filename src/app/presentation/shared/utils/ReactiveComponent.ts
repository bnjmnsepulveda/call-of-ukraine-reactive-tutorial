import { Subscription } from "rxjs";

export class ReactiveComponent {
    
    private subscriptions: Subscription[] = []

    addSubscription(...subscriptions: Subscription[]) {
        subscriptions.forEach(subscription => this.subscriptions.push(subscription))   
    }

    unsubscribeComponent() {
        this.subscriptions.forEach(sub => sub.unsubscribe())
    }
    
}