import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { JhiEventManager, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Shop } from './shop.model';
import { ShopService } from './shop.service';

@Component({
    selector: 'jhi-shop-user',
    templateUrl: './ra-shop-user.component.html'
})
export class ShopUserComponent implements OnInit, OnDestroy {

    shops: Shop[];
    eventSubscriber: Subscription;
    noData: boolean;

    constructor(
        private shopService: ShopService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
    ) {
    }
    ngOnInit(): void {
        this.noData = true;
        this.loadAll();
        this.registerChangeInShops();
    }

    registerChangeInShops() {
        this.eventSubscriber = this.eventManager.subscribe('shopListModification', (response) => this.loadAll());
    }

    loadAll(): void {
        this.shopService.findByUser().subscribe(
            (res) => this.onSuccess(res.json, res.headers),
            (res) => this.onError(res));
    }

    private onSuccess(data, headers) {
        this.shops = data;
        if (this.shops.length > 0) {
            this.noData = false;
        } else {
            this.noData = true;
        }
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    ngOnDestroy(): void {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Shop) {
        return item.id;
    }

}
