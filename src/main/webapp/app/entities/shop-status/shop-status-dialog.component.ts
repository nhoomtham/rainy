import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ShopStatus } from './shop-status.model';
import { ShopStatusPopupService } from './shop-status-popup.service';
import { ShopStatusService } from './shop-status.service';
import { Shop, ShopService } from '../shop';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-shop-status-dialog',
    templateUrl: './ra-shop-status-dialog.component.html',
    styleUrls: ['card.css']
})
export class ShopStatusDialogComponent implements OnInit {

    shopStatus: ShopStatus;
    isSaving: boolean;

    shops: Shop[];
    shopStatusForm: FormGroup;
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
        this.shopStatusForm = new FormGroup({
            id: new FormControl(),
            message: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(128)]),
            shop: new FormControl()
        });
        this.shopStatusForm.get('shop').setValue(this.shopStatus.shop);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save({ value, valid }: { value: ShopStatus, valid: boolean }) {
        this.isSaving = true;
        this.shopStatusService.findByShop(value.shop.id).subscribe((shopStatus) => {
            if (shopStatus) {
                value.id = shopStatus.id;
                this.subscribeToSaveResponse(
                    this.shopStatusService.update(value));
            } else {
                this.subscribeToSaveResponse(
                    this.shopStatusService.create(value));
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<ShopStatus>) {
        result.subscribe((res: ShopStatus) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ShopStatus) {
        this.eventManager.broadcast({ name: 'shopStatusListModification', content: 'OK'});
        this.isSaving = false;
        // this.activeModal.dismiss(result);
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
            if (params['shopId']) {
                this.shopStatusPopupService
                    .open(ShopStatusDialogComponent as Component, params['shopId'], true)
            } else if ( params['id'] ) {
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
