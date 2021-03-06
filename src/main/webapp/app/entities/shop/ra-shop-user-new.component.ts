import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Shop } from './shop.model';
import { ShopService } from './shop.service';
import { User, UserService, Account } from '../../shared';
import { ResponseWrapper } from '../../shared';
import { Principal } from '../../shared/index';

import { HttpErrorResponse } from '@angular/common/http';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import { GeoJson } from '../../geometry/map';
import { MapService } from '../../geometry/map.service';
import { LoaderService } from './loader.service';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { Ng2FileInputService, Ng2FileInputAction } from 'ng2-file-input';

import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';

require('aws-sdk/dist/aws-sdk');

interface Address {
    long_name: string;
    short_name: string;
    types: string[];
}
interface AddressComponent {
    address_components: Address[];
    formatted_address: string;
    geometry: { location: any };
}

interface GeoResult {
    results: AddressComponent[];
    status: string;
}

@Component({
    selector: 'jhi-shop-user-new',
    templateUrl: './ra-shop-user-new.component.html',
    styleUrls: ['card.css'],
})
export class ShopUserNewComponent implements OnInit, OnDestroy {
    @ViewChild('selectedFile')
    private elFile: ElementRef;

    @ViewChild('editor') editor: QuillEditorComponent

    private geoResults: Observable<GeoResult>;
    private addresses: GeoResult;
    private address: Address;
    private account: Account;
    private uploadImage: File;
    private routeSub: any;
    private paramId: number;
    private pic_cover_changed: boolean;

    shop: Shop;
    isSaving: boolean;
    shopForm: FormGroup;
    lat: number;
    lng: number;
    geoPosition: any;
    myFileInputIdentifier: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private shopService: ShopService,
        private userService: UserService,
        private eventManager: JhiEventManager,
        private httpClient: HttpClient,
        private principal: Principal,
        private router: Router,
        private loaderService: LoaderService,
        private route: ActivatedRoute,
        private ng2ImgMax: Ng2ImgMaxService,
        // private mapService: MapService
    ) {
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

    ngOnInit() {
        this.isSaving = false;
        this.initForm();
        this.principal.identity().then((account) => {
            this.account = account;
        });

        this.routeSub = this.route.params.subscribe((params) => {
            if (params['shopId']) {
                this.paramId = params['shopId'];
                this.shopService.findShopOwnedByUser(this.paramId).subscribe((shop) => {
                    this.shop = shop;
                    this.fillForm();
                }, () => { this.router.navigate(['']); } // bad requese or error happened
                );

            } else {
                this.getCurrentPosition().then(
                    // able to get current position from browser
                    () => {
                        this.lat = this.geoPosition.coords.latitude;
                        this.lng = this.geoPosition.coords.longitude;
                    },
                    // unable to get current position from browser
                    () => { this.lat = 0; this.lng = 0; }
                );
            }
        });

        this.editor
            .onContentChanged.debounceTime(400)
            .distinctUntilChanged();
            // .subscribe(data => {
            //    console.log('view child + directly subscription', data)
            // }
            // );
        this.myFileInputIdentifier = 'tHiS_Id_IS_sPeeCiAL';
    }

    private fillForm() {
        this.shopForm.get('id').setValue(this.shop.id);
        this.shopForm.get('name').setValue(this.shop.name);
        this.shopForm.get('category').setValue(this.shop.category);
        this.shopForm.get('age').setValue(this.shop.age);
        this.shopForm.get('shape').setValue(this.shop.shape);
        this.shopForm.get('weight').setValue(this.shop.weight);
        this.shopForm.get('high').setValue(this.shop.high);
        this.shopForm.get('skin').setValue(this.shop.skin);
        this.shopForm.get('tel').setValue(this.shop.tel);
        this.shopForm.get('line_uname').setValue(this.shop.line_uname);
        this.shopForm.get('price').setValue(this.shop.price);
        this.shopForm.get('description').setValue(this.shop.description);
        this.shopForm.get('address').setValue(this.shop.address);
        this.shopForm.get('pic_cover').setValue(this.shop.pic_cover);
        this.shopForm.get('location').setValue(this.shop.location);
        this.shopForm.get('user').setValue(this.shop.user);
        this.shopForm.get('active').setValue(this.shop.active);
        console.log('active:' + this.shop.active);
    }

    private initForm() {
        this.shopForm = new FormGroup({
            id: new FormControl(),
            name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
            category: new FormControl('', Validators.required),
            age: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99)]),
            tel: new FormControl('', Validators.maxLength(11)),
            line_uname: new FormControl('', Validators.maxLength(10)),
            price: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100000)]),
            shape: new FormControl(),
            weight: new FormControl('', [Validators.required, Validators.min(1), Validators.max(199)]),
            high: new FormControl('', [Validators.required, Validators.min(1), Validators.max(199)]),
            skin: new FormControl('', Validators.required),
            pic_cover: new FormControl(),
            description: new FormControl(),
            address: new FormControl('', Validators.required),
            location: new FormControl(),
            user: new FormControl(),
            active: new FormControl()
        });
    }

    private uploadFile(id: number): Observable<any> {
        return new Observable((observer) => {
            // const file = this.elFile.nativeElement.files[0];
            const file = this.uploadImage;
            const defaultBucket = 'https://s3.eu-west-2.amazonaws.com/ra-rainy/';
            const defaultPicture = defaultBucket + 'default/girl-bunny-question-icon.png';

            if (file !== undefined) {

                const AWSService = (<any>window).AWS;

                this.shopService.getAwsConfig().subscribe((awsConfig) => {
                    AWSService.config.accessKeyId = awsConfig.accessKey;
                    AWSService.config.secretAccessKey = awsConfig.secretKey;
                    AWSService.config.region = awsConfig.region;

                    const bucket = new AWSService.S3({ params: { Bucket: awsConfig.bucketName } });
                    const params = {
                        Key: awsConfig.rootDir + '/' + this.account.login + '/' + id.toString() + '/cover/' + file.name,
                        Body: file,
                        ContentType: file.type
                    };
                    bucket.putObject(params, function(error, res) {
                        if (error) {
                            observer.next(defaultPicture);
                        } else {
                            observer.next(defaultBucket + params.Key);
                        }
                    });
                });
            } else {
                observer.next(defaultPicture);
            }
        });
    }

    onMapClick(event) {
        this.geoResults = this.httpClient
            .get<GeoResult>('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + event.coords.lat + ',' + event.coords.lng +
            '&key=AIzaSyBlk6Nxh8iMaKuhuJK_sv3gFhi_aoeK_Kg&language=th');
        // .do(console.log);
        this.geoResults.subscribe((x: GeoResult) => {
            console.log(x);
            this.addresses = x;
            // this.shopForm.get('address').setValue(this.addresses.results[1].address_components[0].short_name);
            this.shopForm.get('address').setValue(this.addresses.results[1].formatted_address);

            const coordinates = [];
            coordinates.push(event.coords.lat);
            coordinates.push(event.coords.lng);

            const geoJson = new GeoJson(coordinates);
            this.shopForm.get('location').setValue(geoJson.geometry);
        });
    }

    save({ value, valid }: { value: Shop, valid: boolean }) {
        this.isSaving = true;
        this.loaderService.show();

        if (this.paramId) {
            const pic_cover = this.shopForm.get('pic_cover');
            if (this.pic_cover_changed) {
                this.uploadFile(value.id).subscribe((filename) => {
                    pic_cover.setValue(filename);
                    value.pic_cover = filename;
                    this.subscribeToUpdateResponse(
                        this.shopService.update(value));
                });
            } else if (this.shopForm.touched || this.shopForm.dirty) {
                this.subscribeToUpdateResponse(
                    this.shopService.update(value));
            } else {
                this.router.navigate(['shop-user']);
            }
        } else {
            this.userService.find(this.account.login)
                .subscribe((data) => {
                    const user: User = data;
                    value.user = user;
                    this.shopForm.get('user').setValue(user);
                    this.subscribeToSaveResponse(
                        this.shopService.create(value));
                });
        }
    }

    private subscribeToSaveResponse(result: Observable<Shop>) {
        result.subscribe((res: Shop) => {
            // this.onSaveSuccess(res);
            console.log('created shop');
            this.uploadFile(res.id).subscribe((filename) => {
                console.log('uploated file');
                res.pic_cover = filename;
                this.subscribeToUpdateResponse(
                    this.shopService.update(res));
            });
        }, (res: Response) => this.onSaveError());
    }

    private subscribeToUpdateResponse(result: Observable<Shop>) {
        result.subscribe((res: Shop) => {
            this.onSaveSuccess(res);
        }, (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Shop) {
        this.eventManager.broadcast({ name: 'shopListModification', content: 'OK' });
        this.isSaving = false;
        this.loaderService.hide();
        this.router.navigate(['shop-user']);
    }

    private onSaveError() {
        this.isSaving = false;
        this.loaderService.hide();
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    private getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (window.navigator && window.navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.geoPosition = position,
                            console.log(position)
                        resolve();
                    },
                    (error) => {
                        switch (error.code) {
                            case 1:
                                console.log('Permission Denied');
                                break;
                            case 2:
                                console.log('Position Unavailable');
                                break;
                            case 3:
                                console.log('Timeout');
                                break;
                        }
                        reject();
                    }
                );
            };
        });
    }

    onImageChange(event) {
        this.loaderService.show();
        this.pic_cover_changed = true;
        // let image = event.target.file[0];
        const image = this.elFile.nativeElement.files[0];
        this.ng2ImgMax.resizeImage(image, 128, 10000).subscribe((result) => {
            this.uploadImage = new File([result], result.name);
            // console.log('resize img done:' + result.name);
            this.loaderService.hide()
            },
            (error) => {
                console.log('resize img error:' + error);
                this.loaderService.hide()
            });
    }

    fileChange(event) {
        if (event.currentFiles.length > 0) {
            this.loaderService.show();
            this.pic_cover_changed = true;

            const image = event.currentFiles[0];
            this.ng2ImgMax.resizeImage(image, 128, 10000).subscribe((result) => {
                this.uploadImage = new File([result], result.name);
                // console.log('resize img done:' + result.name);
                this.loaderService.hide()
            },
            (error) => {
                    console.log('resize img error:' + error);
                    this.loaderService.hide()
            });
        }
    }

}
