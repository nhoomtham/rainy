package com.rainy.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.rainy.domain.Shop;
import com.rainy.domain.ShopStatus;

import com.rainy.domain.User;
import com.rainy.repository.ShopRepository;
import com.rainy.repository.ShopStatusRepository;
import com.rainy.repository.UserRepository;
import com.rainy.security.SecurityUtils;
import com.rainy.web.rest.errors.BadRequestAlertException;
import com.rainy.web.rest.util.HeaderUtil;
import com.rainy.web.rest.util.PaginationUtil;
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
 * REST controller for managing ShopStatus.
 */
@RestController
@RequestMapping("/api")
public class ShopStatusResource {

    private final Logger log = LoggerFactory.getLogger(ShopStatusResource.class);

    private static final String ENTITY_NAME = "shopStatus";

    private final ShopStatusRepository shopStatusRepository;

    @Autowired
    private ShopRepository shopRepository;

    @Autowired
    private UserRepository userRepository;

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
        Optional<String> login = SecurityUtils.getCurrentUserLogin();
        Optional<User> user = null;
        if (login.isPresent()) {
        	user = userRepository.findOneByLogin(login.get());        	
        }
        if (shopStatus.getId() != null) {
            throw new BadRequestAlertException("A new shopStatus cannot already have an ID", ENTITY_NAME, "idexists");
        }

        Shop shop = shopRepository.findOne(shopStatus.getShop().getId());

        if (shop == null) {
            throw new BadRequestAlertException("A shopStatus should belong to Shop", ENTITY_NAME, "noShopExists");
        } else if (user.isPresent() && shopStatus.getShop().getUser().getId().compareTo(user.get().getId()) != 0 ) {
            throw new BadRequestAlertException("A Shop attached should belong to current user", ENTITY_NAME, "notAuthorized");
        }

        ShopStatus result = shopStatusRepository.save(shopStatus);
        return ResponseEntity.created(new URI("/api/shop-statuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, ""))           
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
            // .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, shopStatus.getId().toString()))
        		.headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ""))
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
    public ResponseEntity<List<ShopStatus>> getAllShopStatuses(Pageable pageable) {
        log.debug("REST request to get a page of ShopStatuses");
        Page<ShopStatus> page = shopStatusRepository.findAllByOrderByLastModifiedDateDesc(pageable);
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
     * GET  /shop-statuses/by-shop/:id : get shopStatus by ShopId.
     *
     * @param shopId the id of the shop to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the shopStatus, or with status 404 (Not Found)
     */
    @GetMapping("/shop-statuses/by-shop/{shopId}")
    @Timed
    public ResponseEntity<ShopStatus> getShopStatusByShop(@PathVariable Long shopId) throws URISyntaxException  {
        log.debug("REST request to get ShopStatus by ShopId : {}", shopId);

        Shop shop = shopRepository.findOne(shopId);
        if (shop == null) {
            throw new BadRequestAlertException("A Shop attached could not be found", ENTITY_NAME, "notAuthorized");
        }
        Optional<User> user;
        Optional<String> login = SecurityUtils.getCurrentUserLogin();
        if (login.isPresent()) {
        	user = userRepository.findOneByLogin(login.get());
            if (user.isPresent() && !shop.getUser().equals(user.get())) {
                throw new BadRequestAlertException("A Shop attached should belong to current user", ENTITY_NAME, "notAuthorized");
            }	
        } else {
        	 throw new BadRequestAlertException("A Shop attached should belong to current user", ENTITY_NAME, "notAuthorized");
        }
                
        ShopStatus shopStatus = shopStatusRepository.findByShop(shop);
       
        if (user.isPresent() && shopStatus != null &&
                !shopStatus.getCreatedBy().equals(user.get().getLogin()) ) {
            throw new BadRequestAlertException("A Shop attached should belong to current user", ENTITY_NAME, "notAuthorized");
        }
        
        if (shopStatus == null) {
        	shopStatus = new ShopStatus();
        }
        
        return  new ResponseEntity<>(shopStatus, null, HttpStatus.OK);                     
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
