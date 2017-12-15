/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { RainyTestModule } from '../../../test.module';
import { AlbumDialogComponent } from '../../../../../../main/webapp/app/entities/album/album-dialog.component';
import { AlbumService } from '../../../../../../main/webapp/app/entities/album/album.service';
import { Album } from '../../../../../../main/webapp/app/entities/album/album.model';
import { ShopService } from '../../../../../../main/webapp/app/entities/shop';

describe('Component Tests', () => {

    describe('Album Management Dialog Component', () => {
        let comp: AlbumDialogComponent;
        let fixture: ComponentFixture<AlbumDialogComponent>;
        let service: AlbumService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RainyTestModule],
                declarations: [AlbumDialogComponent],
                providers: [
                    ShopService,
                    AlbumService
                ]
            })
            .overrideTemplate(AlbumDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlbumDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlbumService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Album(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.album = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'albumListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Album();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.album = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'albumListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
