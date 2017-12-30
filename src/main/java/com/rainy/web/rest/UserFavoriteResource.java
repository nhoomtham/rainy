package com.rainy.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.rainy.domain.UserFavorite;

import com.rainy.repository.UserFavoriteRepository;
import com.rainy.web.rest.errors.BadRequestAlertException;
import com.rainy.web.rest.util.HeaderUtil;
import com.rainy.web.rest.util.PaginationUtil;
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
 * REST controller for managing User_favorite.
 */
@RestController
@RequestMapping("/api")
public class UserFavoriteResource {

    private final Logger log = LoggerFactory.getLogger(UserFavoriteResource.class);

    private static final String ENTITY_NAME = "user_favorite";

    private final UserFavoriteRepository user_favoriteRepository;

    public UserFavoriteResource(UserFavoriteRepository user_favoriteRepository) {
        this.user_favoriteRepository = user_favoriteRepository;
    }

    /**
     * POST  /user-favorites : Create a new user_favorite.
     *
     * @param user_favorite the user_favorite to create
     * @return the ResponseEntity with status 201 (Created) and with body the new user_favorite, or with status 400 (Bad Request) if the user_favorite has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-favorites")
    @Timed
    public ResponseEntity<UserFavorite> createUser_favorite(@Valid @RequestBody UserFavorite user_favorite) throws URISyntaxException {
        log.debug("REST request to save User_favorite : {}", user_favorite);
        if (user_favorite.getId() != null) {
            throw new BadRequestAlertException("A new user_favorite cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserFavorite result = user_favoriteRepository.save(user_favorite);
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
            return createUser_favorite(user_favorite);
        }
        UserFavorite result = user_favoriteRepository.save(user_favorite);
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
        Page<UserFavorite> page = user_favoriteRepository.findAll(pageable);
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
        UserFavorite user_favorite = user_favoriteRepository.findOne(id);
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
        user_favoriteRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
