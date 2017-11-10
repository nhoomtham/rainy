import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { JhiEventManager, JhiParseLinks, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Shop } from './shop.model';
import { ShopService } from './shop.service';

@Component({
    selector: 'jhi-shop-user',
    templateUrl: './ra-shop-user.component.html'

})
export class ShopUserComponent implements OnInit, OnDestroy {

    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

}
