package com.rainy.repository;

import com.rainy.domain.Shop;
import com.rainy.domain.User;
import com.rainy.domain.UserFavorite;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the User_favorite entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserFavoriteRepository extends JpaRepository<UserFavorite, Long> {

    @Query("select ra_user_favorite from UserFavorite ra_user_favorite where ra_user_favorite.user.login = ?#{principal.username}")
    List<UserFavorite> findByUserIsCurrentUser();
    
    Optional<UserFavorite> findByUserAndShop(User user, Shop shop);
  

}
