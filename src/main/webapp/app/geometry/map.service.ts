import { Injectable } from '@angular/core';
import { environment } from './environment';
import { GeoJson } from './map';

@Injectable()
export class MapService {
  constructor() {
    // mapboxgl.accessToken = environment.mapbox.accessToken
  }
}
