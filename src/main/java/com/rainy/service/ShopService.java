package com.rainy.service;

import com.rainy.domain.Shop;
import com.rainy.service.dto.ShopDTO;
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
     *  Get all the shops.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<ShopDTO> findAll(Pageable pageable);

    /**
     *  Get all the shops with position.
     *
     *  @param pageable the pagination information
     *  @param  geometry the current position
     *  @return the list of entities
     */
      Page<ShopDTO> findShopNearby(Pageable pageable, Geometry geometry, Double km);
    /**
     *  Get the "id" shop.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    ShopDTO findOne(Long id);

    /**
     *  Delete the "id" shop.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    /**
     *  Get the shop by user id
     *
     *  @param id the user id
     *  @return the entity
     */

    List<ShopDTO> findByUserId(Long id);

}
