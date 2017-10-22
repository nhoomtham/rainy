import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Shop } from './shop.model';
import { ShopService } from './shop.service';

@Component({
    selector: 'jhi-shop-detail',
    templateUrl: './shop-detail.component.html'
})
export class ShopDetailComponent implements OnInit, OnDestroy {

    shop: Shop;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private shopService: ShopService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInShops();
    }

    load(id) {
        this.shopService.find(id).subscribe((shop) => {
            this.shop = shop;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInShops() {
        this.eventSubscriber = this.eventManager.subscribe(
            'shopListModification',
            (response) => this.load(this.shop.id)
        );
    }
}
