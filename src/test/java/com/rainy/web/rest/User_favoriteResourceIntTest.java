package com.rainy.web.rest;

import com.rainy.RainyApp;

import com.rainy.domain.UserFavorite;
import com.rainy.domain.User;
import com.rainy.domain.Shop;
import com.rainy.repository.UserFavoriteRepository;
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

/**
 * Test class for the User_favoriteResource REST controller.
 *
 * @see UserFavoriteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RainyApp.class)
public class User_favoriteResourceIntTest {

    @Autowired
    private UserFavoriteRepository user_favoriteRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUser_favoriteMockMvc;

    private UserFavorite user_favorite;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserFavoriteResource user_favoriteResource = new UserFavoriteResource(user_favoriteRepository);
        this.restUser_favoriteMockMvc = MockMvcBuilders.standaloneSetup(user_favoriteResource)
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
    public static UserFavorite createEntity(EntityManager em) {
        UserFavorite user_favorite = new UserFavorite();
        // Add required entity
        User user = UserResourceIntTest.createEntity(em);
        em.persist(user);
        em.flush();
        user_favorite.setUser(user);
        // Add required entity
        Shop shop = ShopResourceIntTest.createEntity(em);
        em.persist(shop);
        em.flush();
        user_favorite.setShop(shop);
        return user_favorite;
    }

    @Before
    public void initTest() {
        user_favorite = createEntity(em);
    }

    @Test
    @Transactional
    public void createUser_favorite() throws Exception {
        int databaseSizeBeforeCreate = user_favoriteRepository.findAll().size();

        // Create the User_favorite
        restUser_favoriteMockMvc.perform(post("/api/user-favorites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(user_favorite)))
            .andExpect(status().isCreated());

        // Validate the User_favorite in the database
        List<UserFavorite> user_favoriteList = user_favoriteRepository.findAll();
        assertThat(user_favoriteList).hasSize(databaseSizeBeforeCreate + 1);
        UserFavorite testUser_favorite = user_favoriteList.get(user_favoriteList.size() - 1);
    }

    @Test
    @Transactional
    public void createUser_favoriteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = user_favoriteRepository.findAll().size();

        // Create the User_favorite with an existing ID
        user_favorite.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUser_favoriteMockMvc.perform(post("/api/user-favorites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(user_favorite)))
            .andExpect(status().isBadRequest());

        // Validate the User_favorite in the database
        List<UserFavorite> user_favoriteList = user_favoriteRepository.findAll();
        assertThat(user_favoriteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUser_favorites() throws Exception {
        // Initialize the database
        user_favoriteRepository.saveAndFlush(user_favorite);

        // Get all the user_favoriteList
        restUser_favoriteMockMvc.perform(get("/api/user-favorites?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(user_favorite.getId().intValue())));
    }

    @Test
    @Transactional
    public void getUser_favorite() throws Exception {
        // Initialize the database
        user_favoriteRepository.saveAndFlush(user_favorite);

        // Get the user_favorite
        restUser_favoriteMockMvc.perform(get("/api/user-favorites/{id}", user_favorite.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(user_favorite.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUser_favorite() throws Exception {
        // Get the user_favorite
        restUser_favoriteMockMvc.perform(get("/api/user-favorites/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUser_favorite() throws Exception {
        // Initialize the database
        user_favoriteRepository.saveAndFlush(user_favorite);
        int databaseSizeBeforeUpdate = user_favoriteRepository.findAll().size();

        // Update the user_favorite
        UserFavorite updatedUser_favorite = user_favoriteRepository.findOne(user_favorite.getId());
        // Disconnect from session so that the updates on updatedUser_favorite are not directly saved in db
        em.detach(updatedUser_favorite);

        restUser_favoriteMockMvc.perform(put("/api/user-favorites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUser_favorite)))
            .andExpect(status().isOk());

        // Validate the User_favorite in the database
        List<UserFavorite> user_favoriteList = user_favoriteRepository.findAll();
        assertThat(user_favoriteList).hasSize(databaseSizeBeforeUpdate);
        UserFavorite testUser_favorite = user_favoriteList.get(user_favoriteList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingUser_favorite() throws Exception {
        int databaseSizeBeforeUpdate = user_favoriteRepository.findAll().size();

        // Create the User_favorite

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUser_favoriteMockMvc.perform(put("/api/user-favorites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(user_favorite)))
            .andExpect(status().isCreated());

        // Validate the User_favorite in the database
        List<UserFavorite> user_favoriteList = user_favoriteRepository.findAll();
        assertThat(user_favoriteList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUser_favorite() throws Exception {
        // Initialize the database
        user_favoriteRepository.saveAndFlush(user_favorite);
        int databaseSizeBeforeDelete = user_favoriteRepository.findAll().size();

        // Get the user_favorite
        restUser_favoriteMockMvc.perform(delete("/api/user-favorites/{id}", user_favorite.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserFavorite> user_favoriteList = user_favoriteRepository.findAll();
        assertThat(user_favoriteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserFavorite.class);
        UserFavorite user_favorite1 = new UserFavorite();
        user_favorite1.setId(1L);
        UserFavorite user_favorite2 = new UserFavorite();
        user_favorite2.setId(user_favorite1.getId());
        assertThat(user_favorite1).isEqualTo(user_favorite2);
        user_favorite2.setId(2L);
        assertThat(user_favorite1).isNotEqualTo(user_favorite2);
        user_favorite1.setId(null);
        assertThat(user_favorite1).isNotEqualTo(user_favorite2);
    }
}
