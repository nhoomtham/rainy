import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Shop } from './shop.model';
import { ShopService } from './shop.service';
import { Principal } from '../../shared/index';

@Injectable()
export class ShopPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private shopService: ShopService,
        private principal: Principal
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }
            this.principal.identity().then((acct) => {
                if (id && acct.id) {
                    this.shopService.findShopOwnedByUser(id, acct.id).subscribe((shop) => {
                        this.ngbModalRef = this.shopModalRef(component, shop);
                        resolve(this.ngbModalRef);
                    }, () => { this.router.navigate(['']); } // bad requese or error happened
                    );
                } else {
                    // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                    setTimeout(() => {
                        this.ngbModalRef = this.shopModalRef(component, new Shop());
                        resolve(this.ngbModalRef);
                    }, 0);
                }
            });
        });
    }

    shopModalRef(component: Component, shop: Shop): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.shop = shop;
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
