import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Shop } from './shop.model';
import { ShopPopupService } from './shop-popup.service';
import { ShopService } from './shop.service';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-shop-dialog',
    templateUrl: './shop-dialog.component.html',
})
export class ShopDialogComponent implements OnInit {

    shop: Shop;
    isSaving: boolean;
    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private shopService: ShopService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.shop.id !== undefined) {
            this.subscribeToSaveResponse(
                this.shopService.update(this.shop));
        } else {
            this.subscribeToSaveResponse(
                this.shopService.create(this.shop));
        }
    }

    private subscribeToSaveResponse(result: Observable<Shop>) {
        result.subscribe((res: Shop) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Shop) {
        this.eventManager.broadcast({ name: 'shopListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-shop-popup',
    template: ''
})
export class ShopPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private shopPopupService: ShopPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.shopPopupService
                    .open(ShopDialogComponent as Component, params['id']);
            } else {
                this.shopPopupService
                    .open(ShopDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
