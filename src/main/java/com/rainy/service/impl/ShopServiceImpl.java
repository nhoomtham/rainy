package com.rainy.service.impl;

import com.rainy.service.ShopService;
import com.rainy.domain.Shop;
import com.rainy.repository.ShopRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Shop.
 */
@Service
@Transactional
public class ShopServiceImpl implements ShopService{

    private final Logger log = LoggerFactory.getLogger(ShopServiceImpl.class);

    private final ShopRepository shopRepository;

    public ShopServiceImpl(ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }

    /**
     * Save a shop.
     *
     * @param shop the entity to save
     * @return the persisted entity
     */
    @Override
    public Shop save(Shop shop) {
        log.debug("Request to save Shop : {}", shop);
        return shopRepository.save(shop);
    }

    /**
     * Get all the shops.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Shop> findAll(Pageable pageable) {
        log.debug("Request to get all Shops");
        return shopRepository.findAll(pageable);
    }

    /**
     * Get one shop by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Shop findOne(Long id) {
        log.debug("Request to get Shop : {}", id);
        return shopRepository.findOne(id);
    }

    /**
     * Delete the shop by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Shop : {}", id);
        shopRepository.delete(id);
    }
}
