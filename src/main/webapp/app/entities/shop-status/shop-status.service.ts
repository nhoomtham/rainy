import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { ShopStatus } from './shop-status.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ShopStatusService {

    private resourceUrl = SERVER_API_URL + 'api/shop-statuses';
    constructor(private http: Http, private httpClient: HttpClient) { }

    create(shopStatus: ShopStatus): Observable<ShopStatus> {
        const copy = this.convert(shopStatus);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(shopStatus: ShopStatus): Observable<ShopStatus> {
        const copy = this.convert(shopStatus);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ShopStatus> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    findByShop(shopId: number): Observable<ShopStatus> {
        // return this.httpClient.get<ShopStatus>(`${this.resourceUrl}/by-shop/${shopId}`);
        return this.http.get(`${this.resourceUrl}/by-shop/${shopId}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to ShopStatus.
     */
    private convertItemFromServer(json: any): ShopStatus {
        const entity: ShopStatus = Object.assign(new ShopStatus(), json);
        return entity;
    }

    /**
     * Convert a ShopStatus to a JSON which can be sent to the server.
     */
    private convert(shopStatus: ShopStatus): ShopStatus {
        const copy: ShopStatus = Object.assign({}, shopStatus);
        return copy;
    }
}
