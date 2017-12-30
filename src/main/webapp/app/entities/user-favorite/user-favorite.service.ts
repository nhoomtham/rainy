import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { UserFavorite } from './user-favorite.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class UserFavoriteService {

    private resourceUrl = SERVER_API_URL + 'api/user-favorites';

    constructor(private http: Http) { }

    create(user_favorite: UserFavorite): Observable<UserFavorite> {
        const copy = this.convert(user_favorite);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(user_favorite: UserFavorite): Observable<UserFavorite> {
        const copy = this.convert(user_favorite);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<UserFavorite> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
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
     * Convert a returned JSON object to UserFavorite.
     */
    private convertItemFromServer(json: any): UserFavorite {
        const entity: UserFavorite = Object.assign(new UserFavorite(), json);
        return entity;
    }

    /**
     * Convert a UserFavorite to a JSON which can be sent to the server.
     */
    private convert(user_favorite: UserFavorite): UserFavorite {
        const copy: UserFavorite = Object.assign({}, user_favorite);
        return copy;
    }
}
