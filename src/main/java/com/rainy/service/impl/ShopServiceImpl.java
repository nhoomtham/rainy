package com.rainy.service.impl;

import com.rainy.domain.Shop;
import com.rainy.repository.ShopRepository;
import com.rainy.service.GeometryService;
import com.rainy.service.ShopService;
import com.rainy.service.dto.ShopDTO;
import com.rainy.service.mapper.ShopMapper;
import com.vividsolutions.jts.geom.Geometry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


/**
 * Service Implementation for managing Shop.
 */
@Service
@Transactional
public class ShopServiceImpl implements ShopService{

    private final Logger log = LoggerFactory.getLogger(ShopServiceImpl.class);

    private final ShopRepository shopRepository;

    private final ShopMapper shopMapper;

    private final GeometryService geometryService;

    public ShopServiceImpl(ShopRepository shopRepository, ShopMapper shopMapper, GeometryService geometryService) {
        this.shopRepository = shopRepository;
        this.shopMapper = shopMapper;
        this.geometryService = geometryService;
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
     *  Get all the shops.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ShopDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Shops");
        Page<Shop> shopPages = shopRepository.findAll(pageable);
        List<ShopDTO> newShopDTOs = calculateDistance(shopPages);
        return new PageImpl<>(newShopDTOs, pageable, shopPages.getTotalElements());
    }

    @Override
    public Page<ShopDTO> findShopNearby(Pageable pageable, Geometry geometry, Double km) {
        log.debug("Request to get all Shops NearBy");
        Page<Shop> shopPages = shopRepository.findNearBy(pageable, geometry, km);
        List<ShopDTO> newShopDTOs = calculateDistance(shopPages);
        return new PageImpl<>(newShopDTOs, pageable, shopPages.getTotalElements());
    }

    private List<ShopDTO> calculateDistance(Page<Shop> shopPages) {
        final List<Shop> shops = shopPages.getContent();
        final List<ShopDTO> shopDTOs = shopMapper.shopsToShopDTOs(shops);
        List<ShopDTO> newShopDTOs = new ArrayList<>();
        for (ShopDTO shopDTO : shopDTOs) {
            final Geometry g1 = shopDTO.getLocation().norm();
            final Geometry g2 = geometryService.wktToGeometry("POINT("
                                    + geometryService.getLat().toString()
                                    + " "
                                    + geometryService.getLng().toString()
                                    + ")");
            final Double dist = g1.distance(g2) * 100;
            shopDTO.setDistance(dist.shortValue());
            newShopDTOs.add(shopDTO);
        }
        return newShopDTOs;
    }

    /**
     *  Get one shop by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ShopDTO findOne(Long id) {
        log.debug("Request to get Shop : {}", id);
        Shop shop = shopRepository.findOne(id);
        return shopMapper.shopToShopDTO(shop);
    }

    /**
     *  Delete the  shop by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Shop : {}", id);
        shopRepository.delete(id);
    }

    @Override
    public List<ShopDTO> findByUserId(Long id) {
        List<Shop> shops = shopRepository.findByUserId(id);
        return  shopMapper.shopsToShopDTOs(shops);
    }
}
