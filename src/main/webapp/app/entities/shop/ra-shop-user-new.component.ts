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
export class ShopUserNewComponent implements OnInit {
    @ViewChild('selectedFile')
    private elFile: ElementRef;

    private geoResults: Observable<GeoResult>;
    private addresses: GeoResult;
    private address: Address;
    private account: Account;

    shop: Shop;
    isSaving: boolean;
    shopForm: FormGroup;

    constructor(
        private jhiAlertService: JhiAlertService,
        private shopService: ShopService,
        private userService: UserService,
        private eventManager: JhiEventManager,
        private httpClient: HttpClient,
        private principal: Principal,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.shopForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
            sex: new FormControl('', Validators.required),
            age: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99)]),
            shape: new FormControl(),
            weight: new FormControl('', [Validators.required, Validators.min(1), Validators.max(199)]),
            high: new FormControl('', [Validators.required, Validators.min(1), Validators.max(199)]),
            skin: new FormControl('', Validators.required),
            pic_cover: new FormControl(),
            description: new FormControl(),
            district: new FormControl('', Validators.required),
            subdistrict: new FormControl('', Validators.required),
            province: new FormControl('', Validators.required),
            location: new FormControl()
        });

        this.principal.identity().then((account) => {
            this.account = account;
        });

    }

    private uploadFile(id: number): Observable<any> {
        return new Observable((observer) => {
            const file = this.elFile.nativeElement.files[0];
            const defaultBucket = 'https://s3.eu-west-2.amazonaws.com/ra-rainy/';
            const defaultPicture = defaultBucket + 'default/girl-bunny-question-icon.png';

            if (file !== undefined) {

                const AWSService = (<any>window).AWS;

                AWSService.config.accessKeyId = 'AKIAIRWII44N4AXM23DA';
                AWSService.config.secretAccessKey = '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';
                AWSService.config.region = 'eu-west-2';

                const bucket = new AWSService.S3({ params: { Bucket: 'ra-rainy' } });
                const params = {
                    Key: this.account.login + '/pic_cover_' + id,
                    Body: file,
                    ContentType: file.type
                };
                bucket.putObject(params, function (error, res) {
                    if (error) {
                        observer.next(defaultPicture);
                    } else {
                        observer.next(defaultBucket + params.Key);
                    }
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
            this.shopForm.get('subdistrict').setValue(this.addresses.results[1].address_components[0].short_name);
            this.shopForm.get('district').setValue(this.addresses.results[1].address_components[1].short_name);
            this.shopForm.get('province').setValue(this.addresses.results[1].address_components[2].short_name);

            let coordinates = [];
            coordinates.push(event.coords.lat);
            coordinates.push(event.coords.lng);

            const geoJson = new GeoJson(coordinates);
            this.shopForm.get('location').setValue(geoJson.geometry);
        });
    }

    save({ value, valid }: { value: Shop, valid: boolean }) {
        this.isSaving = true;

        this.userService.find(this.account.login)
            .subscribe((data) => {
                const user: User = data;
                console.log('got user');
                value.user = user;
                this.subscribeToSaveResponse(
                    this.shopService.create(value));
            });
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
            console.log('update shop');
        }, (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Shop) {
        this.eventManager.broadcast({ name: 'shopListModification', content: 'OK' });
        this.isSaving = false;
        this.router.navigate(['shop-user']);

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
