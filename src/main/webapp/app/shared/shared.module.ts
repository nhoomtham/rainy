import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';

import {
    RainySharedLibsModule,
    RainySharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    JhiLoginModalComponent,
    Principal,
    HasAnyAuthorityDirective,
    JhiSocialComponent,
    SocialService,
} from './';

@NgModule({
    imports: [
        RainySharedLibsModule,
        RainySharedCommonModule
    ],
    declarations: [
        JhiSocialComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        SocialService,
        UserService,
        DatePipe,
        MenuItems
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        RainySharedCommonModule,
        JhiSocialComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe,
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RainySharedModule {}
