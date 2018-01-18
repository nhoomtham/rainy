import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import { MatIconModule, MatCardModule, MatInputModule, MatCheckboxModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FlexLayoutModule } from '@angular/flex-layout';

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
    RaLoginService,
    RaLoginModalService,
    RaJhiLoginModalComponent,
    Principal,
    HasAnyAuthorityDirective,
    JhiSocialComponent,
    SocialService,
} from './';

@NgModule({
    imports: [
        RainySharedLibsModule,
        RainySharedCommonModule,
         MatIconModule,
         MatCardModule,
         MatInputModule,
         MatCheckboxModule,
         MatButtonModule,
         // FlexLayoutModule,
         FormsModule,
         ReactiveFormsModule,
    ],
    declarations: [
        JhiSocialComponent,
        JhiLoginModalComponent,
        RaJhiLoginModalComponent,
        HasAnyAuthorityDirective,
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective
    ],
    providers: [
        LoginService,
        LoginModalService,
        RaLoginService,
        RaLoginModalService,
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
    entryComponents: [
        JhiLoginModalComponent,
        RaJhiLoginModalComponent],
    exports: [
        RainySharedCommonModule,
        JhiSocialComponent,
        JhiLoginModalComponent,
        RaJhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe,
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RainySharedModule {}
