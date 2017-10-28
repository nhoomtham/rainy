package com.rainy.service;

import com.rainy.domain.Shop;
import com.vividsolutions.jts.geom.Geometry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

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
     *  Get all the shops with position.
     *
     *  @param pageable the pagination information
     *  @param  geometry the current position
     *  @return the list of entities
     */
  /*  Page<Shop> findAllWithPosition(Pageable pageable, Geometry geometry);
*/
      Page<Shop> findShopNearby(Pageable pageable, Geometry geometry, Double km);
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
