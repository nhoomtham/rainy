/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { RainyTestModule } from '../../../test.module';
import { ShopStatusDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/shop-status/shop-status-delete-dialog.component';
import { ShopStatusService } from '../../../../../../main/webapp/app/entities/shop-status/shop-status.service';

describe('Component Tests', () => {

    describe('ShopStatus Management Delete Component', () => {
        let comp: ShopStatusDeleteDialogComponent;
        let fixture: ComponentFixture<ShopStatusDeleteDialogComponent>;
        let service: ShopStatusService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RainyTestModule],
                declarations: [ShopStatusDeleteDialogComponent],
                providers: [
                    ShopStatusService
                ]
            })
            .overrideTemplate(ShopStatusDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ShopStatusDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShopStatusService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
