/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { RainyTestModule } from '../../../test.module';
import { AlbumDetailComponent } from '../../../../../../main/webapp/app/entities/album/album-detail.component';
import { AlbumService } from '../../../../../../main/webapp/app/entities/album/album.service';
import { Album } from '../../../../../../main/webapp/app/entities/album/album.model';

describe('Component Tests', () => {

    describe('Album Management Detail Component', () => {
        let comp: AlbumDetailComponent;
        let fixture: ComponentFixture<AlbumDetailComponent>;
        let service: AlbumService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RainyTestModule],
                declarations: [AlbumDetailComponent],
                providers: [
                    AlbumService
                ]
            })
            .overrideTemplate(AlbumDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlbumDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlbumService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Album(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.album).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
