import * as $ from 'jquery';
import { MediaMatcher } from '@angular/cdk/layout';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { JhiLanguageHelper } from '../../shared';

import { ChangeDetectorRef, NgZone, OnDestroy, ViewChild, HostListener, Directive, AfterViewInit } from '@angular/core';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { AppHeaderComponent } from '../full/header/header.component';
import { AppSidebarComponent } from '../full/sidebar/sidebar.component';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit, OnDestroy {
    mobileQuery: MediaQueryList;

    private _mobileQueryListener: () => void;

    constructor(
        private jhiLanguageHelper: JhiLanguageHelper,
        private router: Router,
        changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        public menuItems: MenuItems
    ) {
        this.mobileQuery = media.matchMedia('(min-width: 768px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'rainyApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}
