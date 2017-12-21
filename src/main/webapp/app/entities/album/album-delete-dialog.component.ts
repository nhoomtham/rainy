import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Album } from './album.model';
import { AlbumPopupService } from './album-popup.service';
import { AlbumService } from './album.service';
import { Account } from '../../shared';
import { ShopService } from '../shop/shop.service';
import { Principal } from '../../shared/index';

@Component({
    selector: 'jhi-album-delete-dialog',
    templateUrl: './album-delete-dialog.component.html'
})
export class AlbumDeleteDialogComponent {

    album: Album;
    account: Account;

    constructor(
        private albumService: AlbumService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private shopService: ShopService,
        private principal: Principal
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {

        this.principal.identity().then((account) => {
            this.account = account;
            this.deleteFile(id).subscribe(() => {
                this.albumService.delete(id).subscribe((response) => {
                    this.eventManager.broadcast({
                        name: 'albumListModification',
                        content: 'Deleted an album'
                    });
                    // this.loaderService.hide();
                    this.activeModal.dismiss(true);
                });
            });
        });
    }

    private deleteFile(id: number): Observable<any> {
        return new Observable((observer) => {
            const AWSService = (<any>window).AWS;

            this.shopService.getAwsConfig().subscribe((awsConfig) => {
                AWSService.config.accessKeyId = awsConfig.accessKey;
                AWSService.config.secretAccessKey = awsConfig.secretKey;
                AWSService.config.region = awsConfig.region;

                const bucket = new AWSService.S3({ params: { Bucket: awsConfig.bucketName } });
                const file = this.album.url.split('/');
                const fileName = file[8].split('.');

                const params = {
                    Key: awsConfig.rootDir + '/' + this.account.login + '/' + id.toString() + '/album/' + file[8],
                };
                bucket.deleteObject(params, function(error, res) {
                    console.log('deleted1:' + res);
                });

                const param2 = {
                    Key: awsConfig.rootDir + '/' + this.account.login + '/' + id.toString() + '/album/' + fileName[0] + '_320.' + fileName[1],
                };
                bucket.deleteObject(param2, function(error, res) {
                    console.log('deleted2:' + res);
                });

                const param3 = {
                    Key: awsConfig.rootDir + '/' + this.account.login + '/' + id.toString() + '/album/' + fileName[0] + '_640.' + fileName[1],
                };
                bucket.deleteObject(param3, function(error, res) {
                    console.log('deleted3:' + res);
                    observer.next();
                });

            });
        });
    }
}

@Component({
    selector: 'jhi-album-delete-popup',
    template: ''
})
export class AlbumDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private albumPopupService: AlbumPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.albumPopupService
                .open(AlbumDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
