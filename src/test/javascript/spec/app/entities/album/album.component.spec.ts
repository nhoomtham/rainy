/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { RainyTestModule } from '../../../test.module';
import { AlbumComponent } from '../../../../../../main/webapp/app/entities/album/album.component';
import { AlbumService } from '../../../../../../main/webapp/app/entities/album/album.service';
import { Album } from '../../../../../../main/webapp/app/entities/album/album.model';

describe('Component Tests', () => {

    describe('Album Management Component', () => {
        let comp: AlbumComponent;
        let fixture: ComponentFixture<AlbumComponent>;
        let service: AlbumService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RainyTestModule],
                declarations: [AlbumComponent],
                providers: [
                    AlbumService
                ]
            })
            .overrideTemplate(AlbumComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlbumComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlbumService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Album(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.albums[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
