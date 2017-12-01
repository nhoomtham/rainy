package com.rainy.web.rest;

import com.rainy.RainyApp;

import com.rainy.domain.ShopStatus;
import com.rainy.repository.ShopStatusRepository;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ShopStatusResource REST controller.
 *
 * @see ShopStatusResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RainyApp.class)
public class ShopStatusResourceIntTest {

    private static final String DEFAULT_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE = "BBBBBBBBBB";

    @Autowired
    private ShopStatusRepository shopStatusRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restShopStatusMockMvc;

    private ShopStatus shopStatus;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ShopStatusResource shopStatusResource = new ShopStatusResource(shopStatusRepository);
        this.restShopStatusMockMvc = MockMvcBuilders.standaloneSetup(shopStatusResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ShopStatus createEntity(EntityManager em) {
        ShopStatus shopStatus = new ShopStatus()
            .message(DEFAULT_MESSAGE);
        return shopStatus;
    }

    @Before
    public void initTest() {
        shopStatus = createEntity(em);
    }

    @Test
    @Transactional
    public void createShopStatus() throws Exception {
        int databaseSizeBeforeCreate = shopStatusRepository.findAll().size();

        // Create the ShopStatus
        restShopStatusMockMvc.perform(post("/api/shop-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shopStatus)))
            .andExpect(status().isCreated());

        // Validate the ShopStatus in the database
        List<ShopStatus> shopStatusList = shopStatusRepository.findAll();
        assertThat(shopStatusList).hasSize(databaseSizeBeforeCreate + 1);
        ShopStatus testShopStatus = shopStatusList.get(shopStatusList.size() - 1);
        assertThat(testShopStatus.getMessage()).isEqualTo(DEFAULT_MESSAGE);
    }

    @Test
    @Transactional
    public void createShopStatusWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = shopStatusRepository.findAll().size();

        // Create the ShopStatus with an existing ID
        shopStatus.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restShopStatusMockMvc.perform(post("/api/shop-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shopStatus)))
            .andExpect(status().isBadRequest());

        // Validate the ShopStatus in the database
        List<ShopStatus> shopStatusList = shopStatusRepository.findAll();
        assertThat(shopStatusList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkMessageIsRequired() throws Exception {
        int databaseSizeBeforeTest = shopStatusRepository.findAll().size();
        // set the field null
        shopStatus.setMessage(null);

        // Create the ShopStatus, which fails.

        restShopStatusMockMvc.perform(post("/api/shop-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shopStatus)))
            .andExpect(status().isBadRequest());

        List<ShopStatus> shopStatusList = shopStatusRepository.findAll();
        assertThat(shopStatusList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllShopStatuses() throws Exception {
        // Initialize the database
        shopStatusRepository.saveAndFlush(shopStatus);

        // Get all the shopStatusList
        restShopStatusMockMvc.perform(get("/api/shop-statuses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(shopStatus.getId().intValue())))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE.toString())));
    }

    @Test
    @Transactional
    public void getShopStatus() throws Exception {
        // Initialize the database
        shopStatusRepository.saveAndFlush(shopStatus);

        // Get the shopStatus
        restShopStatusMockMvc.perform(get("/api/shop-statuses/{id}", shopStatus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(shopStatus.getId().intValue()))
            .andExpect(jsonPath("$.message").value(DEFAULT_MESSAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingShopStatus() throws Exception {
        // Get the shopStatus
        restShopStatusMockMvc.perform(get("/api/shop-statuses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateShopStatus() throws Exception {
        // Initialize the database
        shopStatusRepository.saveAndFlush(shopStatus);
        int databaseSizeBeforeUpdate = shopStatusRepository.findAll().size();

        // Update the shopStatus
        ShopStatus updatedShopStatus = shopStatusRepository.findOne(shopStatus.getId());
        updatedShopStatus
            .message(UPDATED_MESSAGE);

        restShopStatusMockMvc.perform(put("/api/shop-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedShopStatus)))
            .andExpect(status().isOk());

        // Validate the ShopStatus in the database
        List<ShopStatus> shopStatusList = shopStatusRepository.findAll();
        assertThat(shopStatusList).hasSize(databaseSizeBeforeUpdate);
        ShopStatus testShopStatus = shopStatusList.get(shopStatusList.size() - 1);
        assertThat(testShopStatus.getMessage()).isEqualTo(UPDATED_MESSAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingShopStatus() throws Exception {
        int databaseSizeBeforeUpdate = shopStatusRepository.findAll().size();

        // Create the ShopStatus

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restShopStatusMockMvc.perform(put("/api/shop-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shopStatus)))
            .andExpect(status().isCreated());

        // Validate the ShopStatus in the database
        List<ShopStatus> shopStatusList = shopStatusRepository.findAll();
        assertThat(shopStatusList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteShopStatus() throws Exception {
        // Initialize the database
        shopStatusRepository.saveAndFlush(shopStatus);
        int databaseSizeBeforeDelete = shopStatusRepository.findAll().size();

        // Get the shopStatus
        restShopStatusMockMvc.perform(delete("/api/shop-statuses/{id}", shopStatus.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ShopStatus> shopStatusList = shopStatusRepository.findAll();
        assertThat(shopStatusList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ShopStatus.class);
        ShopStatus shopStatus1 = new ShopStatus();
        shopStatus1.setId(1L);
        ShopStatus shopStatus2 = new ShopStatus();
        shopStatus2.setId(shopStatus1.getId());
        assertThat(shopStatus1).isEqualTo(shopStatus2);
        shopStatus2.setId(2L);
        assertThat(shopStatus1).isNotEqualTo(shopStatus2);
        shopStatus1.setId(null);
        assertThat(shopStatus1).isNotEqualTo(shopStatus2);
    }
}
