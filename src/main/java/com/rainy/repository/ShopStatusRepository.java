package com.rainy.repository;

import com.rainy.domain.Shop;
import com.rainy.domain.ShopStatus;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

import java.util.Optional;


/**
 * Spring Data JPA repository for the ShopStatus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShopStatusRepository extends JpaRepository<ShopStatus, Long> {
    ShopStatus findByShop(Shop shop);

	Page<ShopStatus> findAllByOrderByLastModifiedDateDesc(Pageable pageable);
}
