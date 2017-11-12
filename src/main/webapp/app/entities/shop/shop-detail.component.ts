import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { JhiEventManager } from 'ng-jhipster';

import { ResponseWrapper } from '../../shared';

import { Observable } from 'rxjs/Observable';

import { Shop } from './shop.model';
import { ShopService } from './shop.service';
import { Album } from '../album/album.model';
import { AlbumService } from '../album/album.service';

interface Address {
    long_name: string;
    short_name: string;
}
interface AddressComponent {
    address_components: Address[];
    formatted_address: string;
    types: string[];
}

interface GeoResult {
    results: AddressComponent[];
}

@Component({
    selector: 'jhi-shop-detail',
    templateUrl: './ra-shop-detail.component.html',
    styleUrls: ['card.css'],
})
export class ShopDetailComponent implements OnInit, OnDestroy {

    shop: Shop;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    albums: Album[];
    courses: Observable<GeoResult[]>;
    address: GeoResult[];
    constructor(
        private eventManager: JhiEventManager,
        private shopService: ShopService,
        private route: ActivatedRoute,
        private albumService: AlbumService,
        private httpClient: HttpClient
    ) {
    }

    onMapClick(event) {
        console.log('xxxxx: ' + event.coords.lat);
        this.courses = this.httpClient
            .get<GeoResult[]>('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + event.coords.lat + ',' + event.coords.lng +
                '&key=AIzaSyBlk6Nxh8iMaKuhuJK_sv3gFhi_aoeK_Kg&language=th');
        // .do(console.log);
        this.courses.subscribe((x) => {
            console.log(x);

            this.address = x;
            console.log(this.address[0]);
            // address_components[1].short_name
        });
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
