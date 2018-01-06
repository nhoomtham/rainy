package com.rainy.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.rainy.domain.Shop;
import com.rainy.domain.User;
import com.rainy.domain.UserFavorite;
import com.rainy.repository.ShopRepository;
import com.rainy.repository.UserFavoriteRepository;
import com.rainy.service.ShopService;
import com.rainy.service.UserFavoriteService;
import com.rainy.service.UserService;
import com.rainy.service.dto.ShopDTO;
import com.rainy.web.rest.errors.BadRequestAlertException;
import com.rainy.web.rest.util.HeaderUtil;
import com.rainy.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.actuate.audit.AuditEvent;
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
 * REST controller for managing User_favorite.
 */
@RestController
@RequestMapping("/api")
public class UserFavoriteResource {

    private final Logger log = LoggerFactory.getLogger(UserFavoriteResource.class);

    private static final String ENTITY_NAME = "user_favorite";

    private final UserFavoriteRepository userFavoriteRepository;
    
    private final UserService userService;
    
    private final ShopRepository shopRepository;
    
    private final UserFavoriteService userFavoriteService;
    
    private final ShopService shopService;
    
    public UserFavoriteResource(UserFavoriteRepository userFavoriteRepository, UserService userService,
    		ShopRepository shopRepository, UserFavoriteService userFavoriteService, ShopService shopService) {
        this.userFavoriteRepository = userFavoriteRepository;
        this.userService = userService;
        this.shopRepository = shopRepository;
        this.userFavoriteService = userFavoriteService;
        this.shopService = shopService;
    }

    /**
     * POST  /user-favorites : Create a new user_favorite.
     *
     * @param userFavorite the user_favorite to create
     * @return the ResponseEntity with status 201 (Created) and with body the new user_favorite, or with status 400 (Bad Request) if the user_favorite has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-favorites")
    @Timed
    public ResponseEntity<UserFavorite> createUserFavorite(@RequestBody UserFavorite userFavorite) throws URISyntaxException {
        log.debug("REST request to save UserFavorite : {}", userFavorite);
        if (userFavorite.getId() != null) {
            throw new BadRequestAlertException("A new userFavorite cannot already have an ID", ENTITY_NAME, "idexists");
        }
        
        Optional<User> user = userService.getUserWithAuthorities();
    	
    	if (user.isPresent()) {
    		userFavorite.setUser(user.get());		
    	} else {
    		throw new BadRequestAlertException("You did not login to system", ENTITY_NAME, "notAuthorized");
    	}
    	
        
        UserFavorite result = userFavoriteRepository.save(userFavorite);
        return ResponseEntity.created(new URI("/api/user-favorites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-favorites : Updates an existing user_favorite.
     *
     * @param user_favorite the user_favorite to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated user_favorite,
     * or with status 400 (Bad Request) if the user_favorite is not valid,
     * or with status 500 (Internal Server Error) if the user_favorite couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-favorites")
    @Timed
    public ResponseEntity<UserFavorite> updateUser_favorite(@Valid @RequestBody UserFavorite user_favorite) throws URISyntaxException {
        log.debug("REST request to update User_favorite : {}", user_favorite);
        if (user_favorite.getId() == null) {
            return createUserFavorite(user_favorite);
        }
        UserFavorite result = userFavoriteRepository.save(user_favorite);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, user_favorite.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-favorites : get all the user_favorites.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of user_favorites in body
     */
    @GetMapping("/user-favorites")
    @Timed
    public ResponseEntity<List<UserFavorite>> getAllUser_favorites(Pageable pageable) {
        log.debug("REST request to get a page of User_favorites");
        Page<UserFavorite> page = userFavoriteRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/user-favorites");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /user-favorites/:id : get the "id" user_favorite.
     *
     * @param id the id of the user_favorite to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the user_favorite, or with status 404 (Not Found)
     */
    @GetMapping("/user-favorites/{id}")
    @Timed
    public ResponseEntity<UserFavorite> getUser_favorite(@PathVariable Long id) {
        log.debug("REST request to get User_favorite : {}", id);
        UserFavorite user_favorite = userFavoriteRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(user_favorite));
    }

    /**
     * DELETE  /user-favorites/:id : delete the "id" user_favorite.
     *
     * @param id the id of the user_favorite to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-favorites/{id}")
    @Timed
    public ResponseEntity<Void> deleteUser_favorite(@PathVariable Long id) {
        log.debug("REST request to delete User_favorite : {}", id);
        userFavoriteRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
    
    /**
     * GET  /user-favorites/shop/:id : get a user who book mark the shop id
     *
     * @param id the id of the shop to retrieve all user who book mark
     * @return the ResponseEntity with status 200 (OK) and with body the user_favorite, or with status 404 (Not Found)
     */
    @GetMapping("/user-favorites/shop/{id}")
    @Timed
    public ResponseEntity<List<UserFavorite>> getUserFavoriteByShop(Pageable pageable, @PathVariable Long id) {
        log.debug("REST request to get UserFavorite by Shop : {}", id);
        
    	log.debug("Verify the shop id {} is belong to the current user.", id);
		final ShopDTO shopDTOs = shopService.findOneByCurrentUser(id);
		if (shopDTOs == null) {
			throw new BadRequestAlertException("You did not login to system", ENTITY_NAME, "notAuthorized");
		}
		
        Shop shop = shopRepository.findOne(id);
        Page<UserFavorite> page = userFavoriteService.findByShop(pageable, shop);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/user-favorites/shop");
        
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    
}
