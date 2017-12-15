import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Album } from './album.model';
import { AlbumService } from './album.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-album',
    templateUrl: './album.component.html'
})
export class AlbumComponent implements OnInit, OnDestroy {
albums: Album[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private albumService: AlbumService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.albumService.query().subscribe(
            (res: ResponseWrapper) => {
                this.albums = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAlbums();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Album) {
        return item.id;
    }
    registerChangeInAlbums() {
        this.eventSubscriber = this.eventManager.subscribe('albumListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
