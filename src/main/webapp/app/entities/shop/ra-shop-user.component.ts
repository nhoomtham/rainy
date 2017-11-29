import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { JhiEventManager, JhiParseLinks, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Shop } from './shop.model';
import { ShopService } from './shop.service';
import { Principal } from '../../shared/index';

@Component({
    selector: 'jhi-shop-user',
    templateUrl: './ra-shop-user.component.html'
})
export class ShopUserComponent implements OnInit, OnDestroy {

    account: Account;
    shops: Shop[];
    eventSubscriber: Subscription;

    constructor(
        private shopService: ShopService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
    ) {
    }
    ngOnInit(): void {
        this.principal.identity().then((account) => {
            this.account = account;
            this.loadAll();
        });
        this.registerChangeInShops();
    }

    registerChangeInShops() {
        this.eventSubscriber = this.eventManager.subscribe('shopListModification', (response) => this.loadAll());
    }

    loadAll() {
        this.shopService.findByUser(+this.account.id).subscribe(
            (res) => this.onSuccess(res),
            (res) => this.onError(res)
            );
    }

    private onSuccess(res: any) {
        this.shops = res;
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
