import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { JhiLanguageService } from 'ng-jhipster';

import { Register } from './register.service';
import { RaLoginModalService, EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from '../../shared';
import { RaLoginService, RaJhiLoginModalComponent } from '../../shared';

const password = new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]);
const confirmPassword = new FormControl(null, CustomValidators.equalTo(password));

@Component({
    selector: 'jhi-register',
    templateUrl: './ra-register.component.html'
})
export class RegisterComponent implements OnInit, AfterViewInit {

    private modalRef: MatDialogRef<RaJhiLoginModalComponent>;

    confirmPassword: string;
    doNotMatch: string;
    error: string;
    errorEmailExists: string;
    errorUserExists: string;
    registerAccount: any;
    success: boolean;
    form: FormGroup;
   
    constructor(
        private languageService: JhiLanguageService,
        private loginModalService: RaLoginModalService,
        private registerService: Register,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.success = false;
        this.registerAccount = {};
        this.form = this.fb.group({
            login: [null, Validators.compose([Validators.required, Validators.minLength(1),
                Validators.maxLength(50), Validators.pattern("^[_'.@A-Za-z0-9-]*$")])],
            email: [null, Validators.compose([Validators.required, Validators.maxLength(50), CustomValidators.email])],
            password: password,
            confirmPassword: confirmPassword
        });
    }

    ngAfterViewInit() {
        // this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#login'), 'focus', []);
    }

    register() {
        this.doNotMatch = null;
        this.error = null;
        this.errorUserExists = null;
        this.errorEmailExists = null;
        this.languageService.getCurrent().then((key) => {
            // this.registerAccount.langKey = key;
            this.registerAccount.langKey = 'th';
            this.registerAccount.login = this.form.get('login').value;
            this.registerAccount.email = this.form.get('email').value;
            this.registerAccount.password = this.form.get('password').value;

            this.registerService.save(this.registerAccount).subscribe(() => {
                this.success = true;
            }, (response) => this.processError(response));
        });
    }

    openLogin() {
        this.modalRef = this.loginModalService.open();
    }

    private processError(response) {
        this.success = null;
        if (response.status === 400 && response.json().type === LOGIN_ALREADY_USED_TYPE) {
            this.errorUserExists = 'ERROR';
        } else if (response.status === 400 && response.json().type === EMAIL_ALREADY_USED_TYPE) {
            this.errorEmailExists = 'ERROR';
        } else {
            this.error = 'ERROR';
        }
    }
}
