import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ResponseWrapper } from '../../shared';

import { Shop } from './shop.model';
import { ShopService } from './shop.service';
import { Album } from '../album/album.model';
import { AlbumService } from '../album/album.service';

@Component({
    selector: 'jhi-shop-detail',
    templateUrl: './ra-shop-detail.component.html',
    styleUrls: ['card.css']
})
export class ShopDetailComponent implements OnInit, OnDestroy {

    shop: Shop;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    albums: Album[];

    constructor(
        private eventManager: JhiEventManager,
        private shopService: ShopService,
        private route: ActivatedRoute,
        private albumService: AlbumService
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
            this.loadAlbums(params['id']);
        });
        this.registerChangeInShops();
    }

    load(id) {
        this.shopService.find(id).subscribe((shop) => {
            this.shop = shop;
        });
    }

    loadAlbums(id) {
      this.albumService.loadAlbumByShop(id).subscribe(
        (res: ResponseWrapper) => {
            this.albums = res.json;
         },
        );
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
