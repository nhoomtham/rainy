import { Route } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { MaterialComponent } from './material.component';

export const MATERIAL_ROUTE: Route = {
    path: 'button',
    component: MaterialComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};
