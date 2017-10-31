import { Injectable } from '@angular/core';
import { environment } from './environment';
import { GeoJson } from './map';
import * as mapboxgl from 'mapbox-gl';

@Injectable()
export class MapService {
  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken
  }
}
