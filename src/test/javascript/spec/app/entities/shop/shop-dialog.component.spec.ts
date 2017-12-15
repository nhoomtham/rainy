/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { RainyTestModule } from '../../../test.module';
import { ShopDialogComponent } from '../../../../../../main/webapp/app/entities/shop/shop-dialog.component';
import { ShopService } from '../../../../../../main/webapp/app/entities/shop/shop.service';
import { Shop } from '../../../../../../main/webapp/app/entities/shop/shop.model';
import { UserService } from '../../../../../../main/webapp/app/shared';

describe('Component Tests', () => {

    describe('Shop Management Dialog Component', () => {
        let comp: ShopDialogComponent;
        let fixture: ComponentFixture<ShopDialogComponent>;
        let service: ShopService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RainyTestModule],
                declarations: [ShopDialogComponent],
                providers: [
                    UserService,
                    ShopService
                ]
            })
            .overrideTemplate(ShopDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ShopDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShopService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Shop(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.shop = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'shopListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Shop();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.shop = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'shopListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
