import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Shop } from './shop.model';
import { ShopPopupService } from './shop-popup.service';
import { ShopService } from './shop.service';
import { Observable } from 'rxjs/Observable';
import { Principal } from '../../shared/index';
import { Account } from '../../shared';
import { LoaderService } from './loader.service';

@Component({
    selector: 'jhi-shop-delete-dialog',
    templateUrl: './shop-delete-dialog.component.html'
})
export class ShopDeleteDialogComponent {

    shop: Shop;
    account: Account;

    constructor(
        private shopService: ShopService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private loaderService: LoaderService
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.loaderService.show();
        this.principal.identity().then((account) => {
            this.account = account;
            this.deleteFile(id).subscribe(() => {
                this.shopService.delete(id).subscribe((response) => {
                    this.eventManager.broadcast({
                        name: 'shopListModification',
                        content: 'Deleted an shop'
                    });
                    this.loaderService.hide();
                    this.activeModal.dismiss(true);
                });
            });
        });
    }

    private deleteFile(id: number): Observable<any> {
        return new Observable((observer) => {
            const defaultPicture = this.shop.pic_cover;
            const AWSService = (<any>window).AWS;

            this.shopService.getAwsConfig().subscribe((awsConfig) => {
                AWSService.config.accessKeyId = awsConfig.accessKey;
                AWSService.config.secretAccessKey = awsConfig.secretKey;
                AWSService.config.region = awsConfig.region;

                const bucket = new AWSService.S3({ params: { Bucket: awsConfig.bucketName } });
                const params = {
                    Key: awsConfig.rootDir + '/' + this.account.login + '/pic_cover_' + id,
                };
                bucket.deleteObject(params, function(error, res) {
                    if (error) {
                        observer.next();
                    } else {
                        observer.next();
                    }
                });
            });
        });
    }
}

@Component({
    selector: 'jhi-shop-delete-popup',
    template: ''
})
export class ShopDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private shopPopupService: ShopPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.shopPopupService
                .open(ShopDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
