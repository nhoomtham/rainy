/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { RainyTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
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
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ShopStatusService,
                    JhiEventManager
                ]
            }).overrideTemplate(ShopStatusDetailComponent, '')
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

            spyOn(service, 'find').and.returnValue(Observable.of(new ShopStatus(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.shopStatus).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
