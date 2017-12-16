import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { JhiPaginationUtil, JhiLanguageService } from 'ng-jhipster';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Shop } from './shop.model';
import { ShopService } from './shop.service';
import { LoaderService } from './loader.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-shop',
    templateUrl: './ra-shop.component.html',
    styleUrls: ['card.css']

})
export class ShopComponent implements OnInit, OnDestroy {

    currentAccount: any;
    shops: Shop[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    geolocationPosition: any;
    searchForm: FormGroup;

    constructor(
        private shopService: ShopService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private paginationUtil: JhiPaginationUtil,
        private paginationConfig: PaginationConfig,
        private loaderService: LoaderService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    ngOnInit() {
        this.searchForm = new FormGroup({
            km: new FormControl(),
            price: new FormControl()
        });

        this.getCurrentPosition().then(
            // able to get current position from browser
            () => this.loadAllWithPosition(),
            // unable to get current position from browser
            () => this.loadAll()
        );
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInShops();
    }

    loadAll() {
        this.shopService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()}).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadAllWithPosition() {
        this.loaderService.show();
        this.shopService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: ['price' + ',' + (this.searchForm.get('price').untouched ? 'asc' : this.searchForm.get('price').value)],
            lat: this.geolocationPosition.coords.latitude,
            lon: this.geolocationPosition.coords.longitude,
            km: this.searchForm.get('km').value
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }
    transition() {
        this.router.navigate(['/shop'], {queryParams:
            {
                page: this.page,
                size: this.itemsPerPage,
                // sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
                sort: ['price' + ',' + (this.searchForm.get('price').untouched ? 'asc' : this.searchForm.get('price').value)],
                lat: this.geolocationPosition.coords.latitude,
                lon: this.geolocationPosition.coords.longitude,
                km: this.searchForm.get('km').value
            }
        });
        this.loadAllWithPosition();
    }

    clear() {
        this.page = 0;
        this.router.navigate(['/shop', {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAllWithPosition();
    }

    private getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (window.navigator && window.navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.geolocationPosition = position,
                        console.log(position)
                        resolve();
                    },
                    (error) => {
                        switch (error.code) {
                            case 1:
                                console.log('Permission Denied');
                                break;
                            case 2:
                                console.log('Position Unavailable');
                                break;
                            case 3:
                                console.log('Timeout');
                                break;
                        }
                        reject();
                    }
                );
            };
        });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Shop) {
        return item.id;
    }

    registerChangeInShops() {
        this.eventSubscriber = this.eventManager.subscribe('shopListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    searchNearBy() {
        this.loadAllWithPosition();
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.shops = data;
        this.loaderService.hide();
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
        this.loaderService.hide();
    }
}
