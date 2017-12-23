import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Album } from './album.model';
import { AlbumService } from './album.service';
import { Principal, ResponseWrapper, Account} from '../../shared';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ShopService } from '../shop/shop.service';
import { Shop } from '../shop/shop.model';
import { LoaderService } from '../shop/loader.service';

import { Ng2ImgMaxService } from 'ng2-img-max';
import { Ng2FileInputService, Ng2FileInputAction } from 'ng2-file-input';

require('aws-sdk/dist/aws-sdk');

@Component({
    selector: 'jhi-album',
    templateUrl: './ra-album.component.html',
    styleUrls: ['album.css']
})
export class AlbumComponent implements OnInit, OnDestroy {

    private account: Account;
    private subscription: Subscription;
    private shopId: number;
    private formBuilder: FormBuilder;
    private shop: Shop;
    private uploadImage: File;
    private uploadImage_320: File;
    private uploadImage_640: File;
    private myFileInputIdentifier: string;

    @ViewChild('selectedFile')
    private elFile: ElementRef;

    albums: Album[];
    eventSubscriber: Subscription;
    albumForm: FormGroup;
    isProgressing: boolean;

    constructor(
        private albumService: AlbumService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute,
        private shopService: ShopService,
        private ng2ImgMax: Ng2ImgMaxService,
        private loaderService: LoaderService,
        private ng2FileInputService: Ng2FileInputService,
    ) {}

    loadByShop(shopId: number) {
        this.albumService.findByShop(shopId).subscribe((res: ResponseWrapper) => {
            this.albums = res.json;
        });
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.isProgressing = true;
            this.shopId = params['shopId'];
            this.loadByShop(this.shopId);
            this.shopService.find(this.shopId).subscribe((shop) => {
                this.shop = shop;
                this.isProgressing = false;
            });
        });

        this.albumForm = new FormGroup({
            id: new FormControl(),
            url: new FormControl('', Validators.required),
            shop: new FormControl()
        });

        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.myFileInputIdentifier = 'tHiS_Id_IS_sPeeCiAL';
        this.registerChangeInAlbums();
    }

    save({ value, valid }: { value: Album, valid: boolean }): void {
        this.isProgressing = true;
        this.uploadFile(this.shop.id).subscribe((filename) => {
            this.albumForm.get('url').setValue(filename);
            value.url = filename;
            value.shop = this.shop;
            this.subscribeToSaveResponse(
                this.albumService.create(value));
        });
    }

    private subscribeToSaveResponse(result: Observable<Album>) {
        result.subscribe((res: Album) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Album) {
        this.eventManager.broadcast({ name: 'albumListModification', content: 'OK' });
        // this.albumForm.get('url').setValue(null);
        // this.elFile.nativeElement.value = '';
        this.albumForm.reset();
        this.isProgressing = false;
        this.ng2FileInputService.reset(this.myFileInputIdentifier);
    }

    private uploadFile(id: number): Observable<any> {
        return new Observable((observer) => {
            const file = this.uploadImage;
            const defaultBucket = 'https://s3.eu-west-2.amazonaws.com/ra-rainy/';

            if (file !== undefined) {
                const fileName = file.name;
                const splitted = fileName.split('.');
                this.shopService.getAwsConfig().subscribe((awsConfig) => {
                    this.putFile(awsConfig, this.uploadImage_640, splitted[0] + '_640' + '.' + splitted[1], id).subscribe((r_fileName) => {
                        console.log('uploaded:' + r_fileName)
                    });
                    this.putFile(awsConfig, this.uploadImage_320, splitted[0] + '_320' + '.' + splitted[1], id).subscribe((r_fileName) => {
                        console.log('uploaded:' + r_fileName)
                    });

                    this.putFile(awsConfig, this.uploadImage, fileName, id).subscribe((r_fileName) => {
                        console.log('uploaded:' + r_fileName)
                        observer.next(defaultBucket + r_fileName);
                    });
                });
            }
        });
    }

    private putFile(awsConfig: any, file: File, fileName: string, shopId: number): Observable<any> {
        return new Observable((observer) => {
            const AWSService = (<any>window).AWS;
            AWSService.config.accessKeyId = awsConfig.accessKey;
            AWSService.config.secretAccessKey = awsConfig.secretKey;
            AWSService.config.region = awsConfig.region;

            const bucket = new AWSService.S3({ params: { Bucket: awsConfig.bucketName } });
            const params = {
                Key: awsConfig.rootDir + '/' + this.account.login + '/' + shopId.toString() + '/album/' + fileName,
                Body: file,
                ContentType: file.type
            };

            bucket.putObject(params, function(error, res) {
                if (error) {
                    // console.log(error);
                    observer.next();
                } else {
                    observer.next(params.Key);
                }
            });
        });
    }

    // Change(event) {
    //    this.albumForm.reset();
    //    const image = this.elFile.nativeElement.files[0];
    //    this.resizeImage64(image);
    //    this.resizeImage320(image);
    //    this.resizeImage640(image);
    // }

    fileChange(event) {
        if (this.albums.length === 6) {
            this.jhiAlertService.error('rainyApp.album.exceeded', null, null);
            this.ng2FileInputService.reset(this.myFileInputIdentifier);
        }

        if (event.currentFiles.length > 0 && this.albums.length !== 6) {
            this.albumForm.reset();
            const image = event.currentFiles[0];
            this.resizeImage64(image);
            this.resizeImage320(image);
            this.resizeImage640(image);
        }
    }

    previousState() {
        window.history.back();
    }

    private resizeImage64(image: any): void {
        this.isProgressing = true;
        this.ng2ImgMax.resizeImage(image, 64, 10000).subscribe((result) => {
            this.albumForm.get('url').setValue(result.name);
            console.log('resize img with size 64 done:' + result.name);
            this.uploadImage = new File([result], result.name);
            this.isProgressing = false;
        },
            (error) => {
                console.log('resize img with size 64 error:' + error);
            }
        );
    }

    private resizeImage320(image: any): void {
        this.isProgressing = true;
        this.ng2ImgMax.resizeImage(image, 320, 10000).subscribe((result) => {
            console.log('resize img with size 320 done:' + result.name);
            this.uploadImage_320 = new File([result], result.name);
            this.isProgressing = false;
        },
            (error) => {
                console.log('resize img with size 320 error:' + error);
            }
        );
    }

    private resizeImage640(image: any): void {
        this.isProgressing = true;
        this.ng2ImgMax.resizeImage(image, 640, 10000).subscribe((result) => {
            console.log('resize img with size 640 done:' + result.name);
            this.uploadImage_640 = new File([result], result.name);
            this.isProgressing = false;
        },
            (error) => {
                console.log('resize img with size 640 error:' + error);
            }
        );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Album) {
        return item.id;
    }

    registerChangeInAlbums() {
        this.eventSubscriber = this.eventManager.subscribe('albumListModification', (response) => this.loadByShop(this.shopId));
    }

    private onSaveError(error) {
        this.jhiAlertService.error(error.message, null, null);
        this.isProgressing = false;
    }

}
