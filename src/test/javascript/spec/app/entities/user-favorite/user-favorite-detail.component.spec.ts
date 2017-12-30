/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { RainyTestModule } from '../../../test.module';
import { UserFavoriteDetailComponent } from '../../../../../../main/webapp/app/entities/user-favorite/user-favorite-detail.component';
import { UserFavoriteService } from '../../../../../../main/webapp/app/entities/user-favorite/user-favorite.service';
import { UserFavorite } from '../../../../../../main/webapp/app/entities/user-favorite/user-favorite.model';

describe('Component Tests', () => {

    describe('User_favorite Management Detail Component', () => {
        let comp: UserFavoriteDetailComponent;
        let fixture: ComponentFixture<UserFavoriteDetailComponent>;
        let service: UserFavoriteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RainyTestModule],
                declarations: [UserFavoriteDetailComponent],
                providers: [
                    UserFavoriteService
                ]
            })
            .overrideTemplate(UserFavoriteDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserFavoriteDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserFavoriteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new UserFavorite(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.user_favorite).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
