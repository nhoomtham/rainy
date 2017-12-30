import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { UserFavorite } from './user-favorite.model';
import { UserFavoriteService } from './user-favorite.service';

@Component({
    selector: 'jhi-user-favorite-detail',
    templateUrl: './user-favorite-detail.component.html'
})
export class UserFavoriteDetailComponent implements OnInit, OnDestroy {

    user_favorite: UserFavorite;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private user_favoriteService: UserFavoriteService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUser_favorites();
    }

    load(id) {
        this.user_favoriteService.find(id).subscribe((userFavorite) => {
            this.user_favorite = userFavorite;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUser_favorites() {
        this.eventSubscriber = this.eventManager.subscribe(
            'user_favoriteListModification',
            (response) => this.load(this.user_favorite.id)
        );
    }
}
