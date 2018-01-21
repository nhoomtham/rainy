import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Principal, RaLoginModalService, RaLoginService, RaJhiLoginModalComponent } from '../../../shared';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {

    private modalRef: MatDialogRef<RaJhiLoginModalComponent>;

    constructor(
        private principal: Principal,
        private loginModalService: RaLoginModalService,
        private loginService: RaLoginService,
        private router: Router
    ) { }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['']);
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    register() {
        this.router.navigate(['/register']);
    }

    settings() {
        this.router.navigate(['/settings']);
    }

    password() {
        this.router.navigate(['/password']);
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }
}
