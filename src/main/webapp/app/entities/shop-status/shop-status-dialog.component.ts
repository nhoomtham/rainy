import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ShopStatus } from './shop-status.model';
import { ShopStatusPopupService } from './shop-status-popup.service';
import { ShopStatusService } from './shop-status.service';
import { Shop, ShopService } from '../shop';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-shop-status-dialog',
    templateUrl: './shop-status-dialog.component.html'
})
export class ShopStatusDialogComponent implements OnInit {

    shopStatus: ShopStatus;
    isSaving: boolean;

    shops: Shop[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private shopStatusService: ShopStatusService,
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
        if (this.shopStatus.id !== undefined) {
            this.subscribeToSaveResponse(
                this.shopStatusService.update(this.shopStatus));
        } else {
            this.subscribeToSaveResponse(
                this.shopStatusService.create(this.shopStatus));
        }
    }

    private subscribeToSaveResponse(result: Observable<ShopStatus>) {
        result.subscribe((res: ShopStatus) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ShopStatus) {
        this.eventManager.broadcast({ name: 'shopStatusListModification', content: 'OK'});
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
    selector: 'jhi-shop-status-popup',
    template: ''
})
export class ShopStatusPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private shopStatusPopupService: ShopStatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.shopStatusPopupService
                    .open(ShopStatusDialogComponent as Component, params['id']);
            } else {
                this.shopStatusPopupService
                    .open(ShopStatusDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
