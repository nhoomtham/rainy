import { Route } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { HomeComponent } from './';

export const HOME_ROUTE: Route = {
    path: '',
    // component: HomeComponent,
    pathMatch: 'full',
    redirectTo: 'shop',
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};
