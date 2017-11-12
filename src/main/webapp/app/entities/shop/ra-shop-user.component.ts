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
     //   throw new Error('Method not implemented.');
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
    //    throw new Error('Method not implemented.');
    }
}
