import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { RaJhiLoginModalComponent } from './ra-login.component';

@Injectable()
export class RaLoginModalService {
    private isOpen = false;
    constructor(
        private modalService: MatDialog,
    ) {}

    open(): MatDialogRef<RaJhiLoginModalComponent> {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(RaJhiLoginModalComponent, {
            height: '450px',
            width: '400px',
        });
        modalRef.afterOpen().subscribe((result) => {
            this.isOpen = false;
        }, (reason) => {
            this.isOpen = false;
        });
        return modalRef;
    }
}
