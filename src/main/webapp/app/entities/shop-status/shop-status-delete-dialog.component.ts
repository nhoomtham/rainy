import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ShopStatus } from './shop-status.model';
import { ShopStatusPopupService } from './shop-status-popup.service';
import { ShopStatusService } from './shop-status.service';

@Component({
    selector: 'jhi-shop-status-delete-dialog',
    templateUrl: './shop-status-delete-dialog.component.html'
})
export class ShopStatusDeleteDialogComponent {

    shopStatus: ShopStatus;

    constructor(
        private shopStatusService: ShopStatusService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.shopStatusService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'shopStatusListModification',
                content: 'Deleted an shopStatus'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-shop-status-delete-popup',
    template: ''
})
export class ShopStatusDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private shopStatusPopupService: ShopStatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.shopStatusPopupService
                .open(ShopStatusDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
