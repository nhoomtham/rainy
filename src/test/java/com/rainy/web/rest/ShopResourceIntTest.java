package com.rainy.web.rest;

import com.rainy.RainyApp;

import com.rainy.domain.Shop;
import com.rainy.repository.ShopRepository;
import com.rainy.service.ShopService;
import com.rainy.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.rainy.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.rainy.domain.enumeration.Ra_type;
import com.rainy.domain.enumeration.Ra_skin;
/**
 * Test class for the ShopResource REST controller.
 *
 * @see ShopResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RainyApp.class)
public class ShopResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PIC_COVER = "AAAAAAAAAA";
    private static final String UPDATED_PIC_COVER = "BBBBBBBBBB";

    private static final String DEFAULT_TEL = "AAAAAAAAAA";
    private static final String UPDATED_TEL = "BBBBBBBBBB";

    private static final String DEFAULT_LINE_UNAME = "AAAAAAAAAA";
    private static final String UPDATED_LINE_UNAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_AGE = 99;
    private static final Integer UPDATED_AGE = 98;

    private static final Ra_type DEFAULT_CATEGORY = Ra_type.MALE;
    private static final Ra_type UPDATED_CATEGORY = Ra_type.FEMALE;

    private static final Integer DEFAULT_PRICE = 1;
    private static final Integer UPDATED_PRICE = 2;

    private static final String DEFAULT_SHAPE = "AAAAAAAAAA";
    private static final String UPDATED_SHAPE = "BBBBBBBBBB";

    private static final Ra_skin DEFAULT_SKIN = Ra_skin.WHITE;
    private static final Ra_skin UPDATED_SKIN = Ra_skin.PALE;

    private static final Integer DEFAULT_HIGH = 200;
    private static final Integer UPDATED_HIGH = 199;

    private static final Integer DEFAULT_WEIGHT = 200;
    private static final Integer UPDATED_WEIGHT = 199;

    private static final String DEFAULT_DISTRICT = "AAAAAAAAAA";
    private static final String UPDATED_DISTRICT = "BBBBBBBBBB";

    private static final String DEFAULT_SUBDISTRICT = "AAAAAAAAAA";
    private static final String UPDATED_SUBDISTRICT = "BBBBBBBBBB";

    private static final String DEFAULT_PROVINCE = "AAAAAAAAAA";
    private static final String UPDATED_PROVINCE = "BBBBBBBBBB";

    @Autowired
    private ShopRepository shopRepository;

    @Autowired
    private ShopService shopService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restShopMockMvc;

    private Shop shop;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ShopResource shopResource = new ShopResource(shopService);
        this.restShopMockMvc = MockMvcBuilders.standaloneSetup(shopResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Shop createEntity(EntityManager em) {
        Shop shop = new Shop()
            .name(DEFAULT_NAME)
            .pic_cover(DEFAULT_PIC_COVER)
            .tel(DEFAULT_TEL)
            .line_uname(DEFAULT_LINE_UNAME)
            .description(DEFAULT_DESCRIPTION)
            .age(DEFAULT_AGE)
            .category(DEFAULT_CATEGORY)
            .price(DEFAULT_PRICE)
            .shape(DEFAULT_SHAPE)
            .skin(DEFAULT_SKIN)
            .high(DEFAULT_HIGH)
            .weight(DEFAULT_WEIGHT)
            .district(DEFAULT_DISTRICT)
            .subdistrict(DEFAULT_SUBDISTRICT)
            .province(DEFAULT_PROVINCE);
        return shop;
    }

    @Before
    public void initTest() {
        shop = createEntity(em);
    }

    @Test
    @Transactional
    public void createShop() throws Exception {
        int databaseSizeBeforeCreate = shopRepository.findAll().size();

        // Create the Shop
        restShopMockMvc.perform(post("/api/shops")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shop)))
            .andExpect(status().isCreated());

        // Validate the Shop in the database
        List<Shop> shopList = shopRepository.findAll();
        assertThat(shopList).hasSize(databaseSizeBeforeCreate + 1);
        Shop testShop = shopList.get(shopList.size() - 1);
        assertThat(testShop.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testShop.getPic_cover()).isEqualTo(DEFAULT_PIC_COVER);
        assertThat(testShop.getTel()).isEqualTo(DEFAULT_TEL);
        assertThat(testShop.getLine_uname()).isEqualTo(DEFAULT_LINE_UNAME);
        assertThat(testShop.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testShop.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testShop.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testShop.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testShop.getShape()).isEqualTo(DEFAULT_SHAPE);
        assertThat(testShop.getSkin()).isEqualTo(DEFAULT_SKIN);
        assertThat(testShop.getHigh()).isEqualTo(DEFAULT_HIGH);
        assertThat(testShop.getWeight()).isEqualTo(DEFAULT_WEIGHT);
        assertThat(testShop.getDistrict()).isEqualTo(DEFAULT_DISTRICT);
        assertThat(testShop.getSubdistrict()).isEqualTo(DEFAULT_SUBDISTRICT);
        assertThat(testShop.getProvince()).isEqualTo(DEFAULT_PROVINCE);
    }

    @Test
    @Transactional
    public void createShopWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = shopRepository.findAll().size();

        // Create the Shop with an existing ID
        shop.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restShopMockMvc.perform(post("/api/shops")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shop)))
            .andExpect(status().isBadRequest());

        // Validate the Shop in the database
        List<Shop> shopList = shopRepository.findAll();
        assertThat(shopList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = shopRepository.findAll().size();
        // set the field null
        shop.setName(null);

        // Create the Shop, which fails.

        restShopMockMvc.perform(post("/api/shops")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shop)))
            .andExpect(status().isBadRequest());

        List<Shop> shopList = shopRepository.findAll();
        assertThat(shopList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllShops() throws Exception {
        // Initialize the database
        shopRepository.saveAndFlush(shop);

        // Get all the shopList
        restShopMockMvc.perform(get("/api/shops?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(shop.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].pic_cover").value(hasItem(DEFAULT_PIC_COVER.toString())))
            .andExpect(jsonPath("$.[*].tel").value(hasItem(DEFAULT_TEL.toString())))
            .andExpect(jsonPath("$.[*].line_uname").value(hasItem(DEFAULT_LINE_UNAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE)))
            .andExpect(jsonPath("$.[*].shape").value(hasItem(DEFAULT_SHAPE.toString())))
            .andExpect(jsonPath("$.[*].skin").value(hasItem(DEFAULT_SKIN.toString())))
            .andExpect(jsonPath("$.[*].high").value(hasItem(DEFAULT_HIGH)))
            .andExpect(jsonPath("$.[*].weight").value(hasItem(DEFAULT_WEIGHT)))
            .andExpect(jsonPath("$.[*].district").value(hasItem(DEFAULT_DISTRICT.toString())))
            .andExpect(jsonPath("$.[*].subdistrict").value(hasItem(DEFAULT_SUBDISTRICT.toString())))
            .andExpect(jsonPath("$.[*].province").value(hasItem(DEFAULT_PROVINCE.toString())));
    }

    @Test
    @Transactional
    public void getShop() throws Exception {
        // Initialize the database
        shopRepository.saveAndFlush(shop);

        // Get the shop
        restShopMockMvc.perform(get("/api/shops/{id}", shop.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(shop.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.pic_cover").value(DEFAULT_PIC_COVER.toString()))
            .andExpect(jsonPath("$.tel").value(DEFAULT_TEL.toString()))
            .andExpect(jsonPath("$.line_uname").value(DEFAULT_LINE_UNAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE))
            .andExpect(jsonPath("$.shape").value(DEFAULT_SHAPE.toString()))
            .andExpect(jsonPath("$.skin").value(DEFAULT_SKIN.toString()))
            .andExpect(jsonPath("$.high").value(DEFAULT_HIGH))
            .andExpect(jsonPath("$.weight").value(DEFAULT_WEIGHT))
            .andExpect(jsonPath("$.district").value(DEFAULT_DISTRICT.toString()))
            .andExpect(jsonPath("$.subdistrict").value(DEFAULT_SUBDISTRICT.toString()))
            .andExpect(jsonPath("$.province").value(DEFAULT_PROVINCE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingShop() throws Exception {
        // Get the shop
        restShopMockMvc.perform(get("/api/shops/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateShop() throws Exception {
        // Initialize the database
        shopService.save(shop);

        int databaseSizeBeforeUpdate = shopRepository.findAll().size();

        // Update the shop
        Shop updatedShop = shopRepository.findOne(shop.getId());
        updatedShop
            .name(UPDATED_NAME)
            .pic_cover(UPDATED_PIC_COVER)
            .tel(UPDATED_TEL)
            .line_uname(UPDATED_LINE_UNAME)
            .description(UPDATED_DESCRIPTION)
            .age(UPDATED_AGE)
            .category(UPDATED_CATEGORY)
            .price(UPDATED_PRICE)
            .shape(UPDATED_SHAPE)
            .skin(UPDATED_SKIN)
            .high(UPDATED_HIGH)
            .weight(UPDATED_WEIGHT)
            .district(UPDATED_DISTRICT)
            .subdistrict(UPDATED_SUBDISTRICT)
            .province(UPDATED_PROVINCE);

        restShopMockMvc.perform(put("/api/shops")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedShop)))
            .andExpect(status().isOk());

        // Validate the Shop in the database
        List<Shop> shopList = shopRepository.findAll();
        assertThat(shopList).hasSize(databaseSizeBeforeUpdate);
        Shop testShop = shopList.get(shopList.size() - 1);
        assertThat(testShop.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testShop.getPic_cover()).isEqualTo(UPDATED_PIC_COVER);
        assertThat(testShop.getTel()).isEqualTo(UPDATED_TEL);
        assertThat(testShop.getLine_uname()).isEqualTo(UPDATED_LINE_UNAME);
        assertThat(testShop.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testShop.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testShop.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testShop.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testShop.getShape()).isEqualTo(UPDATED_SHAPE);
        assertThat(testShop.getSkin()).isEqualTo(UPDATED_SKIN);
        assertThat(testShop.getHigh()).isEqualTo(UPDATED_HIGH);
        assertThat(testShop.getWeight()).isEqualTo(UPDATED_WEIGHT);
        assertThat(testShop.getDistrict()).isEqualTo(UPDATED_DISTRICT);
        assertThat(testShop.getSubdistrict()).isEqualTo(UPDATED_SUBDISTRICT);
        assertThat(testShop.getProvince()).isEqualTo(UPDATED_PROVINCE);
    }

    @Test
    @Transactional
    public void updateNonExistingShop() throws Exception {
        int databaseSizeBeforeUpdate = shopRepository.findAll().size();

        // Create the Shop

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restShopMockMvc.perform(put("/api/shops")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shop)))
            .andExpect(status().isCreated());

        // Validate the Shop in the database
        List<Shop> shopList = shopRepository.findAll();
        assertThat(shopList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteShop() throws Exception {
        // Initialize the database
        shopService.save(shop);

        int databaseSizeBeforeDelete = shopRepository.findAll().size();

        // Get the shop
        restShopMockMvc.perform(delete("/api/shops/{id}", shop.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Shop> shopList = shopRepository.findAll();
        assertThat(shopList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Shop.class);
        Shop shop1 = new Shop();
        shop1.setId(1L);
        Shop shop2 = new Shop();
        shop2.setId(shop1.getId());
        assertThat(shop1).isEqualTo(shop2);
        shop2.setId(2L);
        assertThat(shop1).isNotEqualTo(shop2);
        shop1.setId(null);
        assertThat(shop1).isNotEqualTo(shop2);
    }
}
