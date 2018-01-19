import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { PasswordResetInitService } from './password-reset-init.service';
import { EMAIL_NOT_FOUND_TYPE } from '../../../shared';

@Component({
    selector: 'jhi-password-reset-init',
    templateUrl: './password-reset-init.component.html'
})
export class PasswordResetInitComponent implements OnInit, AfterViewInit {

    error: string;
    errorEmailNotExists: string;
    resetAccount: any;
    success: string;
    form: FormGroup;

    constructor(
        private passwordResetInitService: PasswordResetInitService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.resetAccount = {};
        this.form = this.formBuilder.group({
            email: [null, Validators.compose([Validators.required, Validators.maxLength(50), CustomValidators.email])]
        });
    }

    ngAfterViewInit() {
        // this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#email'), 'focus', []);
    }

    requestReset() {
        console.log('called');
        this.error = null;
        this.errorEmailNotExists = null;
        this.resetAccount.email = this.form.get('email').value;
        this.passwordResetInitService.save(this.resetAccount.email).subscribe(() => {
            this.success = 'OK';
            console.log('ok');
        }, (response) => {
            this.success = null;
            console.log('fail');
            if (response.status === 400 && response.json().type === EMAIL_NOT_FOUND_TYPE) {
                this.errorEmailNotExists = 'ERROR';
            } else {
                this.error = 'ERROR';
            }
        });
    }
}
