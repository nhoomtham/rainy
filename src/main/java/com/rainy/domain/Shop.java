package com.rainy.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.rainy.domain.enumeration.Ra_type;

/**
 * A Shop.
 */
@Entity
@Table(name = "ra_shop")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Shop implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 20)
    @Column(name = "name", length = 20, nullable = false)
    private String name;

    @Column(name = "pic_cover")
    private String pic_cover;

    @Size(max = 20)
    @Column(name = "tel", length = 20)
    private String tel;

    @Size(max = 10)
    @Column(name = "line_uname", length = 10)
    private String line_uname;

    @Size(max = 1000)
    @Column(name = "description", length = 1000)
    private String description;

    @Max(value = 99)
    @Column(name = "age")
    private Integer age;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private Ra_type category;

    @Column(name = "price")
    private Integer price;

    @OneToMany(mappedBy = "shop")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Album> albums = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Shop name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPic_cover() {
        return pic_cover;
    }

    public Shop pic_cover(String pic_cover) {
        this.pic_cover = pic_cover;
        return this;
    }

    public void setPic_cover(String pic_cover) {
        this.pic_cover = pic_cover;
    }

    public String getTel() {
        return tel;
    }

    public Shop tel(String tel) {
        this.tel = tel;
        return this;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getLine_uname() {
        return line_uname;
    }

    public Shop line_uname(String line_uname) {
        this.line_uname = line_uname;
        return this;
    }

    public void setLine_uname(String line_uname) {
        this.line_uname = line_uname;
    }

    public String getDescription() {
        return description;
    }

    public Shop description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getAge() {
        return age;
    }

    public Shop age(Integer age) {
        this.age = age;
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Ra_type getCategory() {
        return category;
    }

    public Shop category(Ra_type category) {
        this.category = category;
        return this;
    }

    public void setCategory(Ra_type category) {
        this.category = category;
    }

    public Integer getPrice() {
        return price;
    }

    public Shop price(Integer price) {
        this.price = price;
        return this;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Set<Album> getAlbums() {
        return albums;
    }

    public Shop albums(Set<Album> albums) {
        this.albums = albums;
        return this;
    }

    public Shop addAlbum(Album album) {
        this.albums.add(album);
        album.setShop(this);
        return this;
    }

    public Shop removeAlbum(Album album) {
        this.albums.remove(album);
        album.setShop(null);
        return this;
    }

    public void setAlbums(Set<Album> albums) {
        this.albums = albums;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Shop shop = (Shop) o;
        if (shop.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), shop.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Shop{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", pic_cover='" + getPic_cover() + "'" +
            ", tel='" + getTel() + "'" +
            ", line_uname='" + getLine_uname() + "'" +
            ", description='" + getDescription() + "'" +
            ", age='" + getAge() + "'" +
            ", category='" + getCategory() + "'" +
            ", price='" + getPrice() + "'" +
            "}";
    }
}
