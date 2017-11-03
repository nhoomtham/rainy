package com.rainy.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.rainy.domain.Shop;
import com.rainy.service.GeometryService;
import com.rainy.service.ShopService;
import com.rainy.service.dto.ShopDTO;
import com.rainy.web.rest.util.HeaderUtil;
import com.rainy.web.rest.util.PaginationUtil;
import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.Point;
import com.vividsolutions.jts.io.ParseException;
import com.vividsolutions.jts.io.WKTReader;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Shop.
 */
@RestController
@RequestMapping("/api")
public class ShopResource {

    private static final int SRID = 4326;

    private final Logger log = LoggerFactory.getLogger(ShopResource.class);

    private static final String ENTITY_NAME = "shop";

    private final ShopService shopService;

    @Autowired
    private GeometryFactory geometryFactory;

    @Autowired
    private GeometryService geometryService;

    public ShopResource(ShopService shopService) {
        this.shopService = shopService;
    }

    /**
     * POST  /shops : Create a new shop.
     *
     * @param shop the shop to create
     * @return the ResponseEntity with status 201 (Created) and with body the new shop, or with status 400 (Bad Request) if the shop has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/shops")
    @Timed
    public ResponseEntity<Shop> createShop(@Valid @RequestBody Shop shop) throws URISyntaxException {
        log.debug("REST request to save Shop : {}", shop);
        if (shop.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new shop cannot already have an ID")).body(null);
        }
        Shop result = shopService.save(shop);
        return ResponseEntity.created(new URI("/api/shops/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /shops : Updates an existing shop.
     *
     * @param shop the shop to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated shop,
     * or with status 400 (Bad Request) if the shop is not valid,
     * or with status 500 (Internal Server Error) if the shop couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/shops")
    @Timed
    public ResponseEntity<Shop> updateShop(@Valid @RequestBody Shop shop) throws URISyntaxException {
        log.debug("REST request to update Shop : {}", shop);
        if (shop.getId() == null) {
            return createShop(shop);
        }
        Shop result = shopService.save(shop);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, shop.getId().toString()))
            .body(result);
    }

    /**
     * GET  /shops : get all the shops.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of shops in body
     */
    @GetMapping("/shops")
    @Timed
    public ResponseEntity<List<ShopDTO>> getAllShops(
            @ApiParam Pageable pageable,
            @RequestParam(value = "lat", defaultValue = "0.0", required = false) Double lat,
            @RequestParam(value = "lon", defaultValue = "0.0", required = false) Double lon,
            @RequestParam(value = "km", defaultValue = "0.0", required = false) Double km ) {
        log.debug("REST request to get a page of Shops");
        log.debug("REST request to get all Shops near by lat:" + lat +",lon:" + lon.toString()+ ",km:" + km.toString());

        final Geometry geometry = geometryService.wktToGeometry("POINT(" + lat.toString() + " " + lon.toString() + ")");
        if (!geometry.getGeometryType().equals("Point")) {
            throw new RuntimeException("Geometry must be a point. Got a " + geometry.getGeometryType());
        }

        geometryService.setLat(lat);
        geometryService.setLng(lon);

        final Point newPoint = geometryFactory.createPoint(new Coordinate(geometry.getCoordinate()));
        newPoint.setSRID(SRID);
        Page<ShopDTO> page;
        if (km == 0.0) {
            page = shopService.findAll(pageable);
        } else {
            page = shopService.findShopNearby(pageable, geometry, km);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/shops");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /shops/:id : get the "id" shop.
     *
     * @param id the id of the shop to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the shop, or with status 404 (Not Found)
     */
    @GetMapping("/shops/{id}")
    @Timed
    public ResponseEntity<ShopDTO> getShop(@PathVariable Long id) {
        log.debug("REST request to get Shop : {}", id);
        ShopDTO shop = shopService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(shop));
    }

    /**
     * DELETE  /shops/:id : delete the "id" shop.
     *
     * @param id the id of the shop to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/shops/{id}")
    @Timed
    public ResponseEntity<Void> deleteShop(@PathVariable Long id) {
        log.debug("REST request to delete Shop : {}", id);
        shopService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
