package com.rainy.service.impl;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rainy.domain.Shop;
import com.rainy.domain.User;
import com.rainy.domain.UserFavorite;
import com.rainy.repository.UserFavoriteRepository;
import com.rainy.security.SecurityUtils;
import com.rainy.service.UserFavoriteService;
import com.rainy.service.UserService;

/**
 * Service Implementation for managing UserFavorite.
 */
@Service
@Transactional
public class UserFavoriteServiceImpl implements UserFavoriteService {

    private final Logger log = LoggerFactory.getLogger(UserFavoriteServiceImpl.class);

	private final UserFavoriteRepository userFavoriteRepository;
	
	private final UserService userService;
	
	public UserFavoriteServiceImpl(UserFavoriteRepository userFavoriteRepository, UserService userService) {
		this.userFavoriteRepository = userFavoriteRepository;
		this.userService = userService;
	}

	@Override
	public Page<UserFavorite> findByShop(Pageable pageable, Shop shop) {
		log.debug("Request to get UserFavorite by Shop : {}", shop.getId());
		return userFavoriteRepository.findByShop(pageable, shop.getId());
	}

	@Override
	public Page<UserFavorite> findByUser(Pageable pageable) {
		Optional<User> user = userService.getUserWithAuthorities();
        if (user.isPresent()) {
        	return userFavoriteRepository.findByUser(pageable, user.get().getId());
        } else {
        	return null;        	
        }		
	}

}
