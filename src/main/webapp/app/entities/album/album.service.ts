import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Album } from './album.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AlbumService {

    private resourceUrl = SERVER_API_URL + 'api/albums';

    constructor(private http: Http) { }

    create(album: Album): Observable<Album> {
        const copy = this.convert(album);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(album: Album): Observable<Album> {
        const copy = this.convert(album);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Album> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    findByShop(shopId: number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}/shop/${shopId}`)
            .map((res: Response) => this.convertResponse(res));
       // return this.http.get(`${this.resourceUrl}/shop/${shopId}`).map((res: Response) => {
       //     const jsonResponse = res.json();
       //     return this.convertItemFromServer(jsonResponse);
       // });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    loadAlbumByShop(id: number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}/shop/${id}`).map((res: Response) => this.convertResponse(res));
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
     * Convert a returned JSON object to Album.
     */
    private convertItemFromServer(json: any): Album {
        const entity: Album = Object.assign(new Album(), json);
        return entity;
    }

    /**
     * Convert a Album to a JSON which can be sent to the server.
     */
    private convert(album: Album): Album {
        const copy: Album = Object.assign({}, album);
        return copy;
    }
}
