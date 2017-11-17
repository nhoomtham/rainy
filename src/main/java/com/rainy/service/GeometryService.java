package com.rainy.service;

import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.io.ParseException;
import com.vividsolutions.jts.io.WKTReader;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.RequestScope;

/**
 * Created by che on 1/11/2560.
 */
@RequestScope
@Service
public class GeometryService {

    private static final int SRID = 4326;

    private Double lat;
    private Double lng;

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Geometry wktToGeometry(String wktPoint) {
        final WKTReader fromText = new WKTReader();
        Geometry geom;
        try {
            geom = fromText.read(wktPoint);
        } catch (ParseException e) {
            throw new RuntimeException("Not a WKT string:" + wktPoint);
        }
        return geom;
    }

    public int getSRID() {
        return SRID;
    }
}
