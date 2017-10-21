import { Component, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';

@Component({
    selector: 'jhi-material',
    templateUrl: './material.component.html',
    styleUrls: ['card.css'],

})
export class MaterialComponent implements OnInit {

    constructor(
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {

    }

}
