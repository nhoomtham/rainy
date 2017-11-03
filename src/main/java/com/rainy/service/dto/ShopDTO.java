package com.rainy.service.dto;

import com.rainy.domain.Shop;
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
public class ShopDTO {

    private Long id;

    @NotBlank
    @Size(max = 20)
    private String name;

    private String pic_cover;

    @Size(max = 20)
    private String tel;

    @Size(max = 10)
    private String line_uname;

    @Size(max = 1000)
    private String description;

    @Max(value = 99)
    private Integer age;

    @Enumerated(EnumType.STRING)
    private Ra_type category;

    private Integer price;

    private Point location;

    private Short distance;

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

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getLine_uname() {
        return line_uname;
    }

    public void setLine_uname(String line_uname) {
        this.line_uname = line_uname;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public ShopDTO() {
        // Empty constructor needed for Jackson.
    }

    public ShopDTO(Shop shop) {
        this(shop.getId(), shop.getName(), shop.getPic_cover(), shop.getTel(), shop.getLine_uname(),
            shop.getDescription(), shop.getAge(), shop.getCategory(), shop.getPrice(), shop.getLocation() );
    }

    public ShopDTO(Long id, String name, String pic_cover, String tel, String line_uname, String description,
                   Integer age, Ra_type category, Integer price, Point location) {
        this.id = id;
        this.name = name;
        this.pic_cover = pic_cover;
        this.tel = tel;
        this.line_uname = line_uname;
        this.description = description;
        this.age = age;
        this.category = category;
        this.price = price;
        this.location = location;
    }
    @Override
    public String toString() {
        return "ShopDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", pic_cover='" + getPic_cover() + "'" +
            ", tel='" + getTel() + "'" +
            ", line_uname='" + getLine_uname() + "'" +
            ", description='" + getDescription() + "'" +
            ", age='" + getAge() + "'" +
            ", category='" + getCategory() + "'" +
            ", price='" + getPrice() + "'" +
            ", location='" + location.getCoordinate().toString() + "'" +
            ", distance=" + distance +
            "}";
    }
}
