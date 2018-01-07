import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserFavorite } from './user-favorite.model';
import { UserFavoritePopupService } from './user-favorite-popup.service';
import { UserFavoriteService } from './user-favorite.service';
import { User, UserService } from '../../shared';
import { Shop, ShopService } from '../shop';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-user-favorite-dialog',
    templateUrl: './user-favorite-dialog.component.html'
})
export class UserFavoriteDialogComponent implements OnInit {

    user_favorite: UserFavorite;
    isSaving: boolean;

    users: User[];

    shops: Shop[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private userFavoriteService: UserFavoriteService,
        private userService: UserService,
        private shopService: ShopService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.shopService.query()
            .subscribe((res: ResponseWrapper) => { this.shops = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.user_favorite.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userFavoriteService.update(this.user_favorite));
        } else {
            // this.subscribeToSaveResponse(
                // this.userFavoriteService.create(this.user_favorite)
            // );
        }
    }

    private subscribeToSaveResponse(result: Observable<UserFavorite>) {
        result.subscribe((res: UserFavorite) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: UserFavorite) {
        this.eventManager.broadcast({ name: 'user_favoriteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
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

    trackShopById(index: number, item: Shop) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-user-favorite-popup',
    template: ''
})
export class UserFavoritePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private user_favoritePopupService: UserFavoritePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.user_favoritePopupService
                    .open(UserFavoriteDialogComponent as Component, params['id']);
            } else {
                this.user_favoritePopupService
                    .open(UserFavoriteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
