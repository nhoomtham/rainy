import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ShopStatus } from './shop-status.model';
import { ShopStatusService } from './shop-status.service';

@Component({
    selector: 'jhi-shop-status-detail',
    templateUrl: './shop-status-detail.component.html'
})
export class ShopStatusDetailComponent implements OnInit, OnDestroy {

    shopStatus: ShopStatus;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private shopStatusService: ShopStatusService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInShopStatuses();
    }

    load(id) {
        this.shopStatusService.find(id).subscribe((shopStatus) => {
            this.shopStatus = shopStatus;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInShopStatuses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'shopStatusListModification',
            (response) => this.load(this.shopStatus.id)
        );
    }
}
