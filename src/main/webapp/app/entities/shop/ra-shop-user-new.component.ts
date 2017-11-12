import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { Observable } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Shop } from './shop.model';
import { ShopService } from './shop.service';
import { User, UserService, Account } from '../../shared';
import { ResponseWrapper } from '../../shared';
import { Principal } from '../../shared/index';

interface Address {
    long_name: string;
    short_name: string;
    types: string[];
}
interface AddressComponent {
    address_components: Address[];
    formatted_address: string;
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

    shop: Shop;
    isSaving: boolean;
    shopForm: FormGroup;
    testForm: FormGroup;
    geoResults: Observable<GeoResult>;
    addresses: GeoResult;
    address: Address;
    
    constructor(
        private jhiAlertService: JhiAlertService,
        private shopService: ShopService,
        private userService: UserService,
        private eventManager: JhiEventManager,
        private httpClient: HttpClient,
        private principal: Principal,
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.shopForm = new FormGroup({
            name: new FormControl(),
            sex: new FormControl(),
            age: new FormControl(),
            shape: new FormControl(),
            weight: new FormControl(),
            high: new FormControl(),
            skin: new FormControl(),
            pic_cover: new FormControl(),
            description: new FormControl(),
            district: new FormControl(),
            subdistrict: new FormControl(),
            province: new FormControl(),
            //formatted_address: new FormControl()
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
            //this.shopForm.get('formatted_address').setValue(this.addresses.results[1].formatted_address);
        });
    }

    save({ value, valid }: { value: Shop, valid: boolean }) {
        this.isSaving = true;
        console.log(value, valid);
        this.principal.identity().then((account) => {
            const acct: Account = account;
            this.userService.find(acct.login)
                .subscribe((data) => {
                    const user: User = data;
                    value.user = user;
                    if (value.id !== undefined) {
                        this.subscribeToSaveResponse(
                            this.shopService.update(value));
                    } else {
                        this.subscribeToSaveResponse(
                            this.shopService.create(value));
                    }
                });
        });
    }

    private subscribeToSaveResponse(result: Observable<Shop>) {
        result.subscribe((res: Shop) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Shop) {
        this.eventManager.broadcast({ name: 'shopListModification', content: 'OK' });
        this.isSaving = false;
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

