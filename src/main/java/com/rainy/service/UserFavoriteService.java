package com.rainy.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.rainy.domain.Shop;
import com.rainy.domain.User;
import com.rainy.domain.UserFavorite;

public interface UserFavoriteService {

	Page<UserFavorite> findByShop(Pageable pageable, Shop shop);
	
	Page<UserFavorite> findByUser(Pageable pageable);
}
