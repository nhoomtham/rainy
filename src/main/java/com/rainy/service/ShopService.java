package com.rainy.service;

import com.rainy.domain.Shop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Shop.
 */
public interface ShopService {

    /**
     * Save a shop.
     *
     * @param shop the entity to save
     * @return the persisted entity
     */
    Shop save(Shop shop);

    /**
     *  Get all the shops.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<Shop> findAll(Pageable pageable);

    /**
     *  Get the "id" shop.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Shop findOne(Long id);

    /**
     *  Delete the "id" shop.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
