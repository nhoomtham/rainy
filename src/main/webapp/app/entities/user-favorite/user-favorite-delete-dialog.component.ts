import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserFavorite } from './user-favorite.model';
import { UserFavoritePopupService } from './user-favorite-popup.service';
import { UserFavoriteService } from './user-favorite.service';

@Component({
    selector: 'jhi-user-favorite-delete-dialog',
    templateUrl: './user-favorite-delete-dialog.component.html'
})
export class UserFavoriteDeleteDialogComponent {

    userFavorite: UserFavorite;

    constructor(
        private user_favoriteService: UserFavoriteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.user_favoriteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'user_favoriteListModification',
                content: 'Deleted an user_favorite'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-favorite-delete-popup',
    template: ''
})
export class UserFavoriteDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private user_favoritePopupService: UserFavoritePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.user_favoritePopupService
                .open(UserFavoriteDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
