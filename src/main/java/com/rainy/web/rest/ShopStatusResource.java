package com.rainy.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.rainy.domain.ShopStatus;

import com.rainy.repository.ShopStatusRepository;
import com.rainy.web.rest.errors.BadRequestAlertException;
import com.rainy.web.rest.util.HeaderUtil;
import com.rainy.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
 * REST controller for managing ShopStatus.
 */
@RestController
@RequestMapping("/api")
public class ShopStatusResource {

    private final Logger log = LoggerFactory.getLogger(ShopStatusResource.class);

    private static final String ENTITY_NAME = "shopStatus";

    private final ShopStatusRepository shopStatusRepository;

    public ShopStatusResource(ShopStatusRepository shopStatusRepository) {
        this.shopStatusRepository = shopStatusRepository;
    }

    /**
     * POST  /shop-statuses : Create a new shopStatus.
     *
     * @param shopStatus the shopStatus to create
     * @return the ResponseEntity with status 201 (Created) and with body the new shopStatus, or with status 400 (Bad Request) if the shopStatus has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/shop-statuses")
    @Timed
    public ResponseEntity<ShopStatus> createShopStatus(@Valid @RequestBody ShopStatus shopStatus) throws URISyntaxException {
        log.debug("REST request to save ShopStatus : {}", shopStatus);
        if (shopStatus.getId() != null) {
            throw new BadRequestAlertException("A new shopStatus cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ShopStatus result = shopStatusRepository.save(shopStatus);
        return ResponseEntity.created(new URI("/api/shop-statuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /shop-statuses : Updates an existing shopStatus.
     *
     * @param shopStatus the shopStatus to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated shopStatus,
     * or with status 400 (Bad Request) if the shopStatus is not valid,
     * or with status 500 (Internal Server Error) if the shopStatus couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/shop-statuses")
    @Timed
    public ResponseEntity<ShopStatus> updateShopStatus(@Valid @RequestBody ShopStatus shopStatus) throws URISyntaxException {
        log.debug("REST request to update ShopStatus : {}", shopStatus);
        if (shopStatus.getId() == null) {
            return createShopStatus(shopStatus);
        }
        ShopStatus result = shopStatusRepository.save(shopStatus);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, shopStatus.getId().toString()))
            .body(result);
    }

    /**
     * GET  /shop-statuses : get all the shopStatuses.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of shopStatuses in body
     */
    @GetMapping("/shop-statuses")
    @Timed
    public ResponseEntity<List<ShopStatus>> getAllShopStatuses(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of ShopStatuses");
        Page<ShopStatus> page = shopStatusRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/shop-statuses");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /shop-statuses/:id : get the "id" shopStatus.
     *
     * @param id the id of the shopStatus to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the shopStatus, or with status 404 (Not Found)
     */
    @GetMapping("/shop-statuses/{id}")
    @Timed
    public ResponseEntity<ShopStatus> getShopStatus(@PathVariable Long id) {
        log.debug("REST request to get ShopStatus : {}", id);
        ShopStatus shopStatus = shopStatusRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(shopStatus));
    }

    /**
     * DELETE  /shop-statuses/:id : delete the "id" shopStatus.
     *
     * @param id the id of the shopStatus to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/shop-statuses/{id}")
    @Timed
    public ResponseEntity<Void> deleteShopStatus(@PathVariable Long id) {
        log.debug("REST request to delete ShopStatus : {}", id);
        shopStatusRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
