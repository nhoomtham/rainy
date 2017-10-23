package com.rainy.repository;

import com.rainy.domain.Album;
import com.rainy.domain.Shop;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Album entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {

    List<Album> findByShop(Shop shop);

}
