/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { RainyTestModule } from '../../../test.module';
import { UserFavoriteDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/user-favorite/user-favorite-delete-dialog.component';
import { UserFavoriteService } from '../../../../../../main/webapp/app/entities/user-favorite/user-favorite.service';

describe('Component Tests', () => {

    describe('User_favorite Management Delete Component', () => {
        let comp: UserFavoriteDeleteDialogComponent;
        let fixture: ComponentFixture<UserFavoriteDeleteDialogComponent>;
        let service: UserFavoriteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RainyTestModule],
                declarations: [UserFavoriteDeleteDialogComponent],
                providers: [
                    UserFavoriteService
                ]
            })
            .overrideTemplate(UserFavoriteDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserFavoriteDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserFavoriteService);
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
