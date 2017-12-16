/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { RainyTestModule } from '../../../test.module';
import { ShopDetailComponent } from '../../../../../../main/webapp/app/entities/shop/shop-detail.component';
import { ShopService } from '../../../../../../main/webapp/app/entities/shop/shop.service';
import { Shop } from '../../../../../../main/webapp/app/entities/shop/shop.model';

describe('Component Tests', () => {

    describe('Shop Management Detail Component', () => {
        let comp: ShopDetailComponent;
        let fixture: ComponentFixture<ShopDetailComponent>;
        let service: ShopService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RainyTestModule],
                declarations: [ShopDetailComponent],
                providers: [
                    ShopService
                ]
            })
            .overrideTemplate(ShopDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ShopDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShopService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Shop(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.shop).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
