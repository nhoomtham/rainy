/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { RainyTestModule } from '../../../test.module';
import { UserFavoriteComponent } from '../../../../../../main/webapp/app/entities/user-favorite/user-favorite.component';
import { UserFavoriteService } from '../../../../../../main/webapp/app/entities/user-favorite/user-favorite.service';
import { UserFavorite } from '../../../../../../main/webapp/app/entities/user-favorite/user-favorite.model';

describe('Component Tests', () => {

    describe('User_favorite Management Component', () => {
        let comp: UserFavoriteComponent;
        let fixture: ComponentFixture<UserFavoriteComponent>;
        let service: UserFavoriteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RainyTestModule],
                declarations: [UserFavoriteComponent],
                providers: [
                    UserFavoriteService
                ]
            })
            .overrideTemplate(UserFavoriteComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserFavoriteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserFavoriteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new UserFavorite(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.user_favorites[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
