package com.rainy.repository;

import com.rainy.domain.Shop;
import com.vividsolutions.jts.geom.Geometry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Shop entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShopRepository extends JpaRepository<Shop, Long> {
/*
    @Query(value = "select s, ST_Distance(ST_GeomFromText(?2, s.location)) from Shop s")
    Page<Shop> findAllWithPosition(Pageable pageable, Geometry geometry);*/

    @Query(value = "select s from Shop s where s.active = true and dwithin(?1, s.location, ?2 * 1000.0, false) = true")
    Page<Shop> findNearByByOrderByLastModifiedDateDesc(Pageable pageable, Geometry geometry, Double km);

    List<Shop> findByUserId(Long id);
    
    Page<Shop> findAllByActiveTrue(Pageable pageable);
    
}
