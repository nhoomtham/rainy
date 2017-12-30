import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { UserFavoriteComponent } from './user-favorite.component';
import { UserFavoriteDetailComponent } from './user-favorite-detail.component';
import { UserFavoritePopupComponent } from './user-favorite-dialog.component';
import { UserFavoriteDeletePopupComponent } from './user-favorite-delete-dialog.component';

@Injectable()
export class UserFavoriteResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const userFavoriteRoute: Routes = [
    {
        path: 'user-favorite',
        component: UserFavoriteComponent,
        resolve: {
            'pagingParams': UserFavoriteResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rainyApp.user_favorite.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-favorite/:id',
        component: UserFavoriteDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rainyApp.user_favorite.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userFavoritePopupRoute: Routes = [
    {
        path: 'user-favorite-new',
        component: UserFavoritePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rainyApp.user_favorite.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-favorite/:id/edit',
        component: UserFavoritePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rainyApp.user_favorite.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-favorite/:id/delete',
        component: UserFavoriteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rainyApp.user_favorite.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
