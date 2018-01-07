package com.rainy.service.impl;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.DeleteObjectsRequest;
import com.rainy.domain.Shop;
import com.rainy.domain.User;
import com.rainy.domain.UserFavorite;
import com.rainy.repository.AlbumRepository;
import com.rainy.repository.ShopRepository;
import com.rainy.repository.ShopStatusRepository;
import com.rainy.repository.UserFavoriteRepository;
import com.rainy.security.SecurityUtils;
import com.rainy.service.GeometryService;
import com.rainy.service.ShopService;
import com.rainy.service.UserService;
import com.rainy.service.dto.AlbumDTO;
import com.rainy.service.dto.ShopDTO;
import com.rainy.service.dto.ShopMiniDTO;
import com.rainy.service.mapper.ShopMapper;
import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.Point;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


/**
 * Service Implementation for managing Shop.
 */
@Service
@Transactional
public class ShopServiceImpl implements ShopService{
	
	private static String AWS_S3_BUCKET = "ra-rainy";

    private final Logger log = LoggerFactory.getLogger(ShopServiceImpl.class);

    private final ShopRepository shopRepository;

    private final ShopMapper shopMapper;

    private final GeometryService geometryService;

    private final UserService userService;
    
    private final UserFavoriteRepository userFavoriteRepository;
    
    @Autowired
    private GeometryFactory geometryFactory;

    @Autowired
    private ShopStatusRepository shopStatusRepository;
    
    @Autowired
    private AlbumRepository albumRepository;
    
    public ShopServiceImpl(ShopRepository shopRepository, ShopMapper shopMapper, GeometryService geometryService, 
    		UserService userService, UserFavoriteRepository userFavoriteRepository) {
        this.shopRepository = shopRepository;
        this.shopMapper = shopMapper;
        this.geometryService = geometryService;
        this.userService = userService;
        this.userFavoriteRepository = userFavoriteRepository;
    }

    /**
     * Save a shop.
     *
     * @param shop the entity to save
     * @return the persisted entity
     */
    @Override
    public ShopDTO save(Shop shop) {
        log.debug("Request to save Shop : {}", shop);

        final Geometry geometry = geometryService.wktToGeometry(shop.getLocation().toText());
        if (!geometry.getGeometryType().equals("Point")) {
            throw new RuntimeException("Geometry must be a point. Got a " + geometry.getGeometryType());
        }

        final Point newPoint = geometryFactory.createPoint(new Coordinate(geometry.getCoordinate()));
        newPoint.setSRID(geometryService.getSRID());
        shop.setLocation(newPoint);

        Shop newShop = shopRepository.save(shop);
        return shopMapper.shopToShopDTO(newShop);
    }

    /**
     * Get all the shops.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ShopMiniDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Shops");
        Page<Shop> shopPages = shopRepository.findAllByActiveTrue(pageable);
        List<ShopMiniDTO> newShopMiniDTOs = calculateDistance(shopPages);
        return new PageImpl<>(newShopMiniDTOs, pageable, shopPages.getTotalElements());
    }

    @Override
    public Page<ShopMiniDTO> findShopNearby(Pageable pageable, Geometry geometry, Double km) {
        log.debug("Request to get all Shops NearBy");
        Page<Shop> shopPages = shopRepository.findNearByByOrderByLastModifiedDateDesc(pageable, geometry, km);
        List<ShopMiniDTO> newShopMiniDTOs = calculateDistance(shopPages);
       
        return new PageImpl<>(newShopMiniDTOs, pageable, shopPages.getTotalElements());
    }

    private List<ShopMiniDTO> calculateDistance(Page<Shop> shopPages) {
        final List<Shop> shops = shopPages.getContent();
        
        return calculateDistance(shops);
        /*
        final List<ShopMiniDTO> shopMiniDTOs = shopMapper.shopsToShopMiniDTOs(shops);
        List<ShopMiniDTO> newShopMiniDTOs = new ArrayList<>();
        for (ShopMiniDTO shopMiniDTO : shopMiniDTOs) {
            final Geometry g1 = shopMiniDTO.getLocation().norm();
            final Geometry g2 = geometryService.wktToGeometry("POINT("
                                    + geometryService.getLat().toString()
                                    + " "
                                    + geometryService.getLng().toString()
                                    + ")");
            final Double dist = g1.distance(g2) * 100;
            shopMiniDTO.setDistance(dist.shortValue());
            newShopMiniDTOs.add(shopMiniDTO);
            
        }
        return newShopMiniDTOs;*/
    }

    private List<ShopMiniDTO> calculateDistance(List<Shop> shops) {
        final List<ShopMiniDTO> shopMiniDTOs = shopMapper.shopsToShopMiniDTOs(shops);
        List<ShopMiniDTO> newShopMiniDTOs = new ArrayList<>();
        for (ShopMiniDTO shopMiniDTO : shopMiniDTOs) {
            final Geometry g1 = shopMiniDTO.getLocation().norm();
            final Geometry g2 = geometryService.wktToGeometry("POINT("
                                    + geometryService.getLat().toString()
                                    + " "
                                    + geometryService.getLng().toString()
                                    + ")");
            final Double dist = g1.distance(g2) * 100;
            shopMiniDTO.setDistance(dist.shortValue());
            newShopMiniDTOs.add(shopMiniDTO);
            
        }
        return newShopMiniDTOs;
    }
    
    private Long getUserFavoriteId(Long shopId) {
    	Long userFavoriteId = 0L;
    	if (SecurityUtils.isAuthenticated()) {
         	Optional<String> userLogin = SecurityUtils.getCurrentUserLogin();
         	Optional<User> user = userService.getUserWithAuthoritiesByLogin(userLogin.get());
     		Shop shop = shopRepository.findOne(shopId);
     		Optional<UserFavorite> userFavorite = userFavoriteRepository.findByUserAndShop(user.get(), shop);
     		if (userFavorite.isPresent()) {
     			userFavoriteId = userFavorite.get().getId();
     		}
         } 
    	return userFavoriteId;
    }
    /**
     * Get one shop by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ShopDTO findOne(Long id) {
        log.debug("Request to get Shop : {}", id);
        final Shop shop = shopRepository.findOne(id);
        if (shop != null) {
        	ShopDTO shopDTO = shopMapper.shopToShopDTO(shop);        	
        	shopDTO.setUserFavoriteId(this.getUserFavoriteId(shop.getId()));
            return shopDTO;
        } else {
            return null;
        }
    }

    /**
     * Delete the shop by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        Shop shop = shopRepository.findOne(id);
        
        log.debug("Request to delete ShopStatus by ShopId : {}", id);
        shopStatusRepository.deleteByShop(shop);
        
        log.debug("Request to delete files on AWS by ShopId : {}", id);
        List<String> files = new ArrayList<String>();
        List<AlbumDTO> albums = albumRepository.findByShop(shop);
        log.debug("Deleting objects from S3 bucket : {}", AWS_S3_BUCKET);
        for (AlbumDTO album : albums) {
        	log.debug("Deleting object : {}", extractFileName(album.getUrl()));
        	files.add(extractFileName(album.getUrl()));
        	files.add(extractFileName(album.getUrl_medium()));
        	files.add(extractFileName(album.getUrl_large()));
        }
        String[] object_keys = new String[files.size()];
        object_keys = files.toArray(object_keys);
        
        final AmazonS3 s3 = AmazonS3ClientBuilder.defaultClient();
        try {
            DeleteObjectsRequest dor = new DeleteObjectsRequest(AWS_S3_BUCKET)
                .withKeys(object_keys);
            s3.deleteObjects(dor);
        } catch (AmazonServiceException e) {
            System.err.println(e.getErrorMessage());
        }
        
        log.debug("Request to delete albums by ShopId : {}", id);
        albumRepository.deleteByShop(shop);
        
        log.debug("Request to delete Shop : {}", id);
        shopRepository.delete(id);
    }

    private String extractFileName(String url) {
		String splittedUrl[] = url.split("/");		
		String fileAndExtension = "";
		
		if (splittedUrl.length > 0) {
			fileAndExtension = splittedUrl[4] + "/" + splittedUrl[5] + "/" + splittedUrl[6]+ "/" +splittedUrl[7] + "/" + splittedUrl[8];			
		}
		
		return fileAndExtension;
	}
    
    @Override
    public List<ShopMiniDTO> findByCurrentUser() {
    	log.debug("Request to get all Shop belong to current user");
    	Optional<User> user = userService.getUserWithAuthorities();
    	
    	if (user.isPresent()) {
    		List<Shop> shops = shopRepository.findByUserId(user.get().getId());
            return shopMapper.shopsToShopMiniDTOs(shops);
    	} else {
    		return null;
    	}
    	        
    }

	@Override
	public ShopDTO findOneByCurrentUser(Long id) {        
        log.debug("Request to get Shop by current user id : {}", id);

		final Shop shop = shopRepository.findOne(id);
        
		if (shop != null) {
			Optional<User> user = userService.getUserWithAuthorities();
			if (user.isPresent()) {
				if (shop.getUser().getId().compareTo(user.get().getId()) == 0) {
					return shopMapper.shopToShopDTO(shop);
				}
			}
		}
		return null;
	}

	@Override
	public Page<ShopMiniDTO> findByUserFavorite(Pageable pageable) {
		log.debug("Request to get all favorite Shop belong to current user");
    	Optional<User> user = userService.getUserWithAuthorities();
    	
    	if (user.isPresent()) {
    		Page<UserFavorite> puf = userFavoriteRepository.findByUser(pageable, user.get().getId());
    		List<UserFavorite> ufs =  puf.getContent();
    		List<Shop> shops = new ArrayList<>();
    		// calculateDistance(shopPages
    		for (UserFavorite uf : ufs) {
    			shops.add(uf.getShop());
    			///ShopMiniDTO shopMiniDTO = shopMapper.shopToShopMiniDTO(uf.getShop());    			
    			// newShopMiniDTOs.add(shopMiniDTO);
    		}
    		List<ShopMiniDTO> shopMiniDTOs = calculateDistance(shops);
    		
    		return new PageImpl<>(shopMiniDTOs, pageable, puf.getTotalElements());
    	}
		return null;
	}

}
