import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Shop } from './shop.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ShopService {

    private resourceUrl = SERVER_API_URL + 'api/shops';
    private raResourceUrl = SERVER_API_URL + 'api/ra-shops';
    private awsResUrl = SERVER_API_URL + 'api/aws';

    constructor(private http: Http, private httpClient: HttpClient) { }

    getAwsConfig(): Observable<any> {
        return this.httpClient.get<any>(`${this.awsResUrl}`);
    }

    create(shop: Shop): Observable<Shop> {
        const copy = this.convert(shop);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(shop: Shop): Observable<Shop> {
        const copy = this.convert(shop);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Shop> {
        // return this.httpClient.get<Shop>(`${this.resourceUrl}/${id}`);
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    findByUser(): Observable<ResponseWrapper> {
        // return this.httpClient.get<Shop>(`${this.resourceUrl}/shop-user`);
       return this.http.get(`${this.resourceUrl}/shop-user`)
            .map((res: Response) => this.convertResponse(res));
    }

    findShopOwnedByUser(shopId: number, userId: number): Observable<Shop> {
        return this.httpClient.get<Shop>(`${this.raResourceUrl}/shop-owned-user/${shopId}/${userId}`);
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
     * Convert a returned JSON object to Shop.
     */
    private convertItemFromServer(json: any): Shop {
        const entity: Shop = Object.assign(new Shop(), json);
        return entity;
    }

    /**
     * Convert a Shop to a JSON which can be sent to the server.
     */
    private convert(shop: Shop): Shop {
        const copy: Shop = Object.assign({}, shop);
        return copy;
    }
}
