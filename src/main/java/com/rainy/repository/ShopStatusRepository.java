package com.rainy.repository;

import com.rainy.domain.ShopStatus;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ShopStatus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShopStatusRepository extends JpaRepository<ShopStatus, Long> {

}
