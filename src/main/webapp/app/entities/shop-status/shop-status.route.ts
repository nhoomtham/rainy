import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ShopStatusComponent } from './shop-status.component';
import { ShopStatusDetailComponent } from './shop-status-detail.component';
import { ShopStatusPopupComponent } from './shop-status-dialog.component';
import { ShopStatusDeletePopupComponent } from './shop-status-delete-dialog.component';

@Injectable()
export class ShopStatusResolvePagingParams implements Resolve<any> {

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

export const shopStatusRoute: Routes = [
    {
        path: 'shop-status',
        component: ShopStatusComponent,
        resolve: {
            'pagingParams': ShopStatusResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rainyApp.shopStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'shop-status-all',
        component: ShopStatusComponent,
        resolve: {
            'pagingParams': ShopStatusResolvePagingParams
        },
        data: {
            pageTitle: 'rainyApp.shopStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    },  {
        path: 'shop-status/:id',
        component: ShopStatusDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rainyApp.shopStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const shopStatusPopupRoute: Routes = [
    {
        path: 'shop-status-new',
        component: ShopStatusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rainyApp.shopStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'shop-status-update/:shopId',
        component: ShopStatusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rainyApp.shopStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'shop-status/:id/edit',
        component: ShopStatusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rainyApp.shopStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'shop-status/:id/delete',
        component: ShopStatusDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rainyApp.shopStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
