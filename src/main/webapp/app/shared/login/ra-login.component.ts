import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { JhiEventManager } from 'ng-jhipster';
import { RaLoginService } from './ra-login.service';
import { StateStorageService } from '../auth/state-storage.service';

@Component({
    selector: 'jhi-ra-login-modal',
    templateUrl: './ra-login.component.html'
})
export class RaJhiLoginModalComponent implements OnInit, AfterViewInit {
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;
    form: FormGroup;

    constructor(
        private eventManager: JhiEventManager,
        private loginService: RaLoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private router: Router,
        private dialogRef: MatDialogRef<RaJhiLoginModalComponent>,
        private fb: FormBuilder,
        public snackBar: MatSnackBar
    ) {
        this.credentials = {};
    }

    ngOnInit() {
        this.form = this.fb.group({
            uname: [null, Validators.compose([Validators.required])],
            password: [null, Validators.compose([Validators.required])],
            rememberMe: []
        });
    }

    ngAfterViewInit() {
        // this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []);
    }

    cancel() {
        this.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
        this.dialogRef.close('cancel');
    }

    openSnackBar() {
        this.snackBar.open('Login failed', 'close', {
            duration: 3000,
        });
    }

    login() {
        this.loginService.login({
            username: this.form.get('uname').value,
            password: this.form.get('password').value,
            rememberMe: this.form.get('rememberMe').value
        }).then(() => {
            this.authenticationError = false;
            this.dialogRef.close('login success');
            if (this.router.url === '/register' || (/^\/activate\//.test(this.router.url)) ||
                (/^\/reset\//.test(this.router.url))) {
                this.router.navigate(['']);
            }

            this.eventManager.broadcast({
                name: 'authenticationSuccess',
                content: 'Sending Authentication Success'
            });

            // // previousState was set in the authExpiredInterceptor before being redirected to login modal.
            // // since login is succesful, go to stored previousState and clear previousState
            const redirect = this.stateStorageService.getUrl();
            if (redirect) {
                this.stateStorageService.storeUrl(null);
                this.router.navigate([redirect]);
            }
        }).catch(() => {
            this.authenticationError = true;
            this.openSnackBar();
        });
    }

    register() {
        this.dialogRef.close('to state register');
        this.router.navigate(['/register']);
    }

    requestResetPassword() {
        this.dialogRef.close('to state requestReset');
        this.router.navigate(['/reset', 'request']);
    }
}
