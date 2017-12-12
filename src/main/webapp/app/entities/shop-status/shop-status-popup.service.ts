import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ShopStatus } from './shop-status.model';
import { ShopStatusService } from './shop-status.service';
import { ShopService } from '../shop/shop.service';

@Injectable()
export class ShopStatusPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private shopStatusService: ShopStatusService,
        private shopService: ShopService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, isNew?: boolean): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (isNew) {
                const shopStatus = new ShopStatus();
                shopStatus.shop = id;
                this.shopService.find(id).subscribe((shop) => {
                    shopStatus.shop = shop;
                    this.ngbModalRef = this.shopStatusModalRef(component, shopStatus);
                    resolve(this.ngbModalRef);
                });

            } else if (id) {
                this.shopStatusService.find(id).subscribe((shopStatus) => {
                    this.ngbModalRef = this.shopStatusModalRef(component, shopStatus);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.shopStatusModalRef(component, new ShopStatus());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    shopStatusModalRef(component: Component, shopStatus: ShopStatus): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.shopStatus = shopStatus;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
