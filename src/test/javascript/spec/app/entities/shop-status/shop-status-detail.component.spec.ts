/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { RainyTestModule } from '../../../test.module';
import { ShopStatusDetailComponent } from '../../../../../../main/webapp/app/entities/shop-status/shop-status-detail.component';
import { ShopStatusService } from '../../../../../../main/webapp/app/entities/shop-status/shop-status.service';
import { ShopStatus } from '../../../../../../main/webapp/app/entities/shop-status/shop-status.model';

describe('Component Tests', () => {

    describe('ShopStatus Management Detail Component', () => {
        let comp: ShopStatusDetailComponent;
        let fixture: ComponentFixture<ShopStatusDetailComponent>;
        let service: ShopStatusService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RainyTestModule],
                declarations: [ShopStatusDetailComponent],
                providers: [
                    ShopStatusService
                ]
            })
            .overrideTemplate(ShopStatusDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ShopStatusDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShopStatusService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ShopStatus(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.shopStatus).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
