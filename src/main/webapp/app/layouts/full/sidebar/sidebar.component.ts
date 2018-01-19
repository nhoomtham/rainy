import { ChangeDetectorRef, Component, NgZone, OnDestroy, ViewChild, HostListener, Directive, AfterViewInit, OnInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { JhiLanguageHelper } from '../../../shared';
import { JhiLanguageService } from 'ng-jhipster';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnInit {

  private _mobileQueryListener: () => void;

  public config: PerfectScrollbarConfigInterface = {};
  mobileQuery: MediaQueryList;  
  languages: any[];

  constructor(
      private languageService: JhiLanguageService,
      private languageHelper: JhiLanguageHelper,
      changeDetectorRef: ChangeDetectorRef,
      media: MediaMatcher,
      public menuItems: MenuItems
  ) {
        this.mobileQuery = media.matchMedia('(min-width: 768px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
      this.languageHelper.getAll().then((languages) => {
          this.languages = languages;
      });
  }

  changeLanguage(languageKey: string) {
      this.languageService.changeLanguage(languageKey);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
 
}
