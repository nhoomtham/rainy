import { URLSearchParams, BaseRequestOptions } from '@angular/http';

export const createRequestOption = (req?: any): BaseRequestOptions => {
    const options: BaseRequestOptions = new BaseRequestOptions();
    if (req) {
        const params: URLSearchParams = new URLSearchParams();
        params.set('page', req.page);
        params.set('size', req.size);
        if (req.sort) {
            params.paramsMap.set('sort', req.sort);
        }
        params.set('query', req.query);

        if (req.lat) {
            params.set('lat', req.lat);
        }
        if (req.lon) {
            params.set('lon', req.lon);
        }
        if (req.km) {
            params.set('km', req.km);
        }

        options.params = params;
    }
    return options;
};
