package com.rainy.service.dto;

import com.rainy.domain.Shop;
import com.rainy.domain.User;
import com.rainy.domain.enumeration.Ra_skin;
import com.rainy.domain.enumeration.Ra_type;
import com.vividsolutions.jts.geom.Point;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Max;
import javax.validation.constraints.Size;

/**
 * Created by che on 2/11/2560.
 */
public class ShopMiniDTO {

    private Long id;

    @NotBlank
    @Size(max = 20)
    private String name;

    private String pic_cover;

    @Max(value = 99)
    private Integer age;

    @Enumerated(EnumType.STRING)
    private Ra_type category;

    private Integer price;

    private Point location;

    private Short distance;

    private Boolean active;


	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPic_cover() {
        return pic_cover;
    }

    public void setPic_cover(String pic_cover) {
        this.pic_cover = pic_cover;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Ra_type getCategory() {
        return category;
    }

    public void setCategory(Ra_type category) {
        this.category = category;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Point getLocation() {
        return location;
    }

    public void setLocation(Point location) {
        this.location = location;
    }

    public Short getDistance() {
        return distance;
    }

    public void setDistance(Short distance) {
        this.distance = distance;
    }

    public ShopMiniDTO() {
        // Empty constructor needed for Jackson.
    }

    public ShopMiniDTO(Shop shop) {
        this(shop.getId(), shop.getName(), shop.getPic_cover(), shop.getAge(), shop.getCategory(), 
        		shop.getPrice(), shop.getLocation(), shop.getUser(), shop.getActive());
    }

    public ShopMiniDTO(Long id, String name, String pic_cover, Integer age, Ra_type category, Integer price, 
    		Point location, User user, Boolean active) {
        this.id = id;
        this.name = name;
        this.pic_cover = pic_cover;
        this.age = age;
        this.category = category;
        this.price = price;
        this.location = location;
        this.user = user;
        this.active = active;
    }
    
    @Override
    public String toString() {
        return "ShopMiniDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", pic_cover='" + getPic_cover() + "'" +
            ", age='" + getAge() + "'" +
            ", category='" + getCategory() + "'" +
            ", location='" + getLocation() + "'" +
            ", price='" + getPrice() + "'" +
            ", distance='" + getDistance() + "'" +
            ", active='" + getActive() + "'" +
            "}";
    }

}
