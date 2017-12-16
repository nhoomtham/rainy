/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { RainyTestModule } from '../../../test.module';
import { ShopStatusComponent } from '../../../../../../main/webapp/app/entities/shop-status/shop-status.component';
import { ShopStatusService } from '../../../../../../main/webapp/app/entities/shop-status/shop-status.service';
import { ShopStatus } from '../../../../../../main/webapp/app/entities/shop-status/shop-status.model';

describe('Component Tests', () => {

    describe('ShopStatus Management Component', () => {
        let comp: ShopStatusComponent;
        let fixture: ComponentFixture<ShopStatusComponent>;
        let service: ShopStatusService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RainyTestModule],
                declarations: [ShopStatusComponent],
                providers: [
                    ShopStatusService
                ]
            })
            .overrideTemplate(ShopStatusComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ShopStatusComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShopStatusService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ShopStatus(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.shopStatuses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
