package com.rainy.service.mapper;

import com.rainy.domain.Shop;
import com.rainy.service.dto.ShopDTO;
import com.rainy.service.dto.ShopMiniDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Created by che on 2/11/2560.
 * Mapper for the entity Shop and its DTO called ShopDTO.
 *
 * Normal mappers are generated using MapStruct, this one is hand-coded as MapStruct
 * support is still in beta, and requires a manual step with an IDE.

 */
@Service
public class ShopMapper {
    
	public ShopDTO shopToShopDTO (Shop shop) { 
    	return new ShopDTO(shop); 
    }
    
	public ShopMiniDTO shopToShopMiniDTO (Shop shop) { 
    	return new ShopMiniDTO(shop); 
    }
    
    public List<ShopDTO> shopsToShopDTOs(List<Shop> shops) {
        return shops.stream()
                .filter(Objects::nonNull)
                .map(this::shopToShopDTO)
                .collect(Collectors.toList());
    }

    public Page<ShopDTO> mapEntityPageIntoDTOPage(Pageable pageable, Page<Shop> source) {
        List<ShopDTO> shopDTOs = shopsToShopDTOs(source.getContent());
        return new PageImpl<>(shopDTOs, pageable, source.getTotalElements());
    }
    
    public List<ShopMiniDTO> shopsToShopMiniDTOs(List<Shop> shops) {
        return shops.stream()
                .filter(Objects::nonNull)
                .map(this::shopToShopMiniDTO)
                .collect(Collectors.toList());
    }

}
