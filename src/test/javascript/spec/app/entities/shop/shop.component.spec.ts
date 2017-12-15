/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { RainyTestModule } from '../../../test.module';
import { ShopComponent } from '../../../../../../main/webapp/app/entities/shop/shop.component';
import { ShopService } from '../../../../../../main/webapp/app/entities/shop/shop.service';
import { Shop } from '../../../../../../main/webapp/app/entities/shop/shop.model';

describe('Component Tests', () => {

    describe('Shop Management Component', () => {
        let comp: ShopComponent;
        let fixture: ComponentFixture<ShopComponent>;
        let service: ShopService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RainyTestModule],
                declarations: [ShopComponent],
                providers: [
                    ShopService
                ]
            })
            .overrideTemplate(ShopComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ShopComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShopService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Shop(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.shops[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
