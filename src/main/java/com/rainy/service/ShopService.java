package com.rainy.service;

import com.rainy.domain.Shop;
import com.rainy.service.dto.ShopDTO;
import com.rainy.service.dto.ShopMiniDTO;
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
    ShopDTO save(Shop shop);

    /**
     * Get all the shops.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ShopMiniDTO> findAll(Pageable pageable);

    /**
     *  Get all the shops with position.
     *
     *  @param pageable the pagination information
     *  @param  geometry the current position
     *  @return the list of entities
     */
      Page<ShopMiniDTO> findShopNearby(Pageable pageable, Geometry geometry, Double km);
    
     /**
     *  Get the "id" shop.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ShopDTO findOne(Long id);

    /**
     * Delete the "id" shop.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     *  Get the shop by current user
     *
     *  @return the entity
     */

    List<ShopMiniDTO> findByCurrentUser();

    /**
     *  Get the "id" shop.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    ShopDTO findOneByCurrentUser(Long id);

}
