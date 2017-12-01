package com.rainy.repository;

import com.rainy.domain.Shop;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Shop entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShopRepository extends JpaRepository<Shop, Long> {

    @Query("select ra_shop from Shop ra_shop where ra_shop.user.login = ?#{principal.username}")
    List<Shop> findByUserIsCurrentUser();

}
