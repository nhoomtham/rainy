/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { RainyTestModule } from '../../../test.module';
import { UserFavoriteDialogComponent } from '../../../../../../main/webapp/app/entities/user-favorite/user-favorite-dialog.component';
import { UserFavoriteService } from '../../../../../../main/webapp/app/entities/user-favorite/user-favorite.service';
import { UserFavorite } from '../../../../../../main/webapp/app/entities/user-favorite/user-favorite.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { ShopService } from '../../../../../../main/webapp/app/entities/shop';

describe('Component Tests', () => {

    describe('User_favorite Management Dialog Component', () => {
        let comp: UserFavoriteDialogComponent;
        let fixture: ComponentFixture<UserFavoriteDialogComponent>;
        let service: UserFavoriteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RainyTestModule],
                declarations: [UserFavoriteDialogComponent],
                providers: [
                    UserService,
                    ShopService,
                    UserFavoriteService
                ]
            })
            .overrideTemplate(UserFavoriteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserFavoriteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserFavoriteService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UserFavorite(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.user_favorite = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'user_favoriteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UserFavorite();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.user_favorite = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'user_favoriteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
