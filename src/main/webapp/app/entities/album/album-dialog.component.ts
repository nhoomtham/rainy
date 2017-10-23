import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Album } from './album.model';
import { AlbumPopupService } from './album-popup.service';
import { AlbumService } from './album.service';
import { Shop, ShopService } from '../shop';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-album-dialog',
    templateUrl: './album-dialog.component.html'
})
export class AlbumDialogComponent implements OnInit {

    album: Album;
    isSaving: boolean;

    shops: Shop[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private albumService: AlbumService,
        private shopService: ShopService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.shopService.query()
            .subscribe((res: ResponseWrapper) => { this.shops = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.album.id !== undefined) {
            this.subscribeToSaveResponse(
                this.albumService.update(this.album));
        } else {
            this.subscribeToSaveResponse(
                this.albumService.create(this.album));
        }
    }

    private subscribeToSaveResponse(result: Observable<Album>) {
        result.subscribe((res: Album) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Album) {
        this.eventManager.broadcast({ name: 'albumListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackShopById(index: number, item: Shop) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-album-popup',
    template: ''
})
export class AlbumPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private albumPopupService: AlbumPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.albumPopupService
                    .open(AlbumDialogComponent as Component, params['id']);
            } else {
                this.albumPopupService
                    .open(AlbumDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
