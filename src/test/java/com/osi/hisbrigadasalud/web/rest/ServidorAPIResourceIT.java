package com.osi.hisbrigadasalud.web.rest;

import com.osi.hisbrigadasalud.HisBrigadaSaludApp;
import com.osi.hisbrigadasalud.domain.ServidorAPI;
import com.osi.hisbrigadasalud.repository.ServidorAPIRepository;
import com.osi.hisbrigadasalud.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;


import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.osi.hisbrigadasalud.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link ServidorAPIResource} REST controller.
 */
@SpringBootTest(classes = HisBrigadaSaludApp.class)
public class ServidorAPIResourceIT {

    private static final String DEFAULT_PROTOCOLO = "AAAAAAAAAA";
    private static final String UPDATED_PROTOCOLO = "BBBBBBBBBB";

    private static final String DEFAULT_SERVER = "AAAAAAAAAA";
    private static final String UPDATED_SERVER = "BBBBBBBBBB";

    private static final String DEFAULT_PORT = "AAAAAAAAAA";
    private static final String UPDATED_PORT = "BBBBBBBBBB";

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ServidorAPIRepository servidorAPIRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restServidorAPIMockMvc;

    private ServidorAPI servidorAPI;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ServidorAPIResource servidorAPIResource = new ServidorAPIResource(servidorAPIRepository);
        this.restServidorAPIMockMvc = MockMvcBuilders.standaloneSetup(servidorAPIResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServidorAPI createEntity() {
        ServidorAPI servidorAPI = new ServidorAPI()
            .protocolo(DEFAULT_PROTOCOLO)
            .server(DEFAULT_SERVER)
            .port(DEFAULT_PORT)
            .estado(DEFAULT_ESTADO)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT);
        return servidorAPI;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServidorAPI createUpdatedEntity() {
        ServidorAPI servidorAPI = new ServidorAPI()
            .protocolo(UPDATED_PROTOCOLO)
            .server(UPDATED_SERVER)
            .port(UPDATED_PORT)
            .estado(UPDATED_ESTADO)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);
        return servidorAPI;
    }

    @BeforeEach
    public void initTest() {
        servidorAPIRepository.deleteAll();
        servidorAPI = createEntity();
    }

    @Test
    public void createServidorAPI() throws Exception {
        int databaseSizeBeforeCreate = servidorAPIRepository.findAll().size();

        // Create the ServidorAPI
        restServidorAPIMockMvc.perform(post("/api/servidor-apis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(servidorAPI)))
            .andExpect(status().isCreated());

        // Validate the ServidorAPI in the database
        List<ServidorAPI> servidorAPIList = servidorAPIRepository.findAll();
        assertThat(servidorAPIList).hasSize(databaseSizeBeforeCreate + 1);
        ServidorAPI testServidorAPI = servidorAPIList.get(servidorAPIList.size() - 1);
        assertThat(testServidorAPI.getProtocolo()).isEqualTo(DEFAULT_PROTOCOLO);
        assertThat(testServidorAPI.getServer()).isEqualTo(DEFAULT_SERVER);
        assertThat(testServidorAPI.getPort()).isEqualTo(DEFAULT_PORT);
        assertThat(testServidorAPI.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testServidorAPI.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testServidorAPI.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    public void createServidorAPIWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = servidorAPIRepository.findAll().size();

        // Create the ServidorAPI with an existing ID
        servidorAPI.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restServidorAPIMockMvc.perform(post("/api/servidor-apis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(servidorAPI)))
            .andExpect(status().isBadRequest());

        // Validate the ServidorAPI in the database
        List<ServidorAPI> servidorAPIList = servidorAPIRepository.findAll();
        assertThat(servidorAPIList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkProtocoloIsRequired() throws Exception {
        int databaseSizeBeforeTest = servidorAPIRepository.findAll().size();
        // set the field null
        servidorAPI.setProtocolo(null);

        // Create the ServidorAPI, which fails.

        restServidorAPIMockMvc.perform(post("/api/servidor-apis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(servidorAPI)))
            .andExpect(status().isBadRequest());

        List<ServidorAPI> servidorAPIList = servidorAPIRepository.findAll();
        assertThat(servidorAPIList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkServerIsRequired() throws Exception {
        int databaseSizeBeforeTest = servidorAPIRepository.findAll().size();
        // set the field null
        servidorAPI.setServer(null);

        // Create the ServidorAPI, which fails.

        restServidorAPIMockMvc.perform(post("/api/servidor-apis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(servidorAPI)))
            .andExpect(status().isBadRequest());

        List<ServidorAPI> servidorAPIList = servidorAPIRepository.findAll();
        assertThat(servidorAPIList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllServidorAPIS() throws Exception {
        // Initialize the database
        servidorAPIRepository.save(servidorAPI);

        // Get all the servidorAPIList
        restServidorAPIMockMvc.perform(get("/api/servidor-apis?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(servidorAPI.getId())))
            .andExpect(jsonPath("$.[*].protocolo").value(hasItem(DEFAULT_PROTOCOLO.toString())))
            .andExpect(jsonPath("$.[*].server").value(hasItem(DEFAULT_SERVER.toString())))
            .andExpect(jsonPath("$.[*].port").value(hasItem(DEFAULT_PORT.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }
    
    @Test
    public void getServidorAPI() throws Exception {
        // Initialize the database
        servidorAPIRepository.save(servidorAPI);

        // Get the servidorAPI
        restServidorAPIMockMvc.perform(get("/api/servidor-apis/{id}", servidorAPI.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(servidorAPI.getId()))
            .andExpect(jsonPath("$.protocolo").value(DEFAULT_PROTOCOLO.toString()))
            .andExpect(jsonPath("$.server").value(DEFAULT_SERVER.toString()))
            .andExpect(jsonPath("$.port").value(DEFAULT_PORT.toString()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    public void getNonExistingServidorAPI() throws Exception {
        // Get the servidorAPI
        restServidorAPIMockMvc.perform(get("/api/servidor-apis/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateServidorAPI() throws Exception {
        // Initialize the database
        servidorAPIRepository.save(servidorAPI);

        int databaseSizeBeforeUpdate = servidorAPIRepository.findAll().size();

        // Update the servidorAPI
        ServidorAPI updatedServidorAPI = servidorAPIRepository.findById(servidorAPI.getId()).get();
        updatedServidorAPI
            .protocolo(UPDATED_PROTOCOLO)
            .server(UPDATED_SERVER)
            .port(UPDATED_PORT)
            .estado(UPDATED_ESTADO)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);

        restServidorAPIMockMvc.perform(put("/api/servidor-apis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedServidorAPI)))
            .andExpect(status().isOk());

        // Validate the ServidorAPI in the database
        List<ServidorAPI> servidorAPIList = servidorAPIRepository.findAll();
        assertThat(servidorAPIList).hasSize(databaseSizeBeforeUpdate);
        ServidorAPI testServidorAPI = servidorAPIList.get(servidorAPIList.size() - 1);
        assertThat(testServidorAPI.getProtocolo()).isEqualTo(UPDATED_PROTOCOLO);
        assertThat(testServidorAPI.getServer()).isEqualTo(UPDATED_SERVER);
        assertThat(testServidorAPI.getPort()).isEqualTo(UPDATED_PORT);
        assertThat(testServidorAPI.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testServidorAPI.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testServidorAPI.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    public void updateNonExistingServidorAPI() throws Exception {
        int databaseSizeBeforeUpdate = servidorAPIRepository.findAll().size();

        // Create the ServidorAPI

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServidorAPIMockMvc.perform(put("/api/servidor-apis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(servidorAPI)))
            .andExpect(status().isBadRequest());

        // Validate the ServidorAPI in the database
        List<ServidorAPI> servidorAPIList = servidorAPIRepository.findAll();
        assertThat(servidorAPIList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteServidorAPI() throws Exception {
        // Initialize the database
        servidorAPIRepository.save(servidorAPI);

        int databaseSizeBeforeDelete = servidorAPIRepository.findAll().size();

        // Delete the servidorAPI
        restServidorAPIMockMvc.perform(delete("/api/servidor-apis/{id}", servidorAPI.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ServidorAPI> servidorAPIList = servidorAPIRepository.findAll();
        assertThat(servidorAPIList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServidorAPI.class);
        ServidorAPI servidorAPI1 = new ServidorAPI();
        servidorAPI1.setId("id1");
        ServidorAPI servidorAPI2 = new ServidorAPI();
        servidorAPI2.setId(servidorAPI1.getId());
        assertThat(servidorAPI1).isEqualTo(servidorAPI2);
        servidorAPI2.setId("id2");
        assertThat(servidorAPI1).isNotEqualTo(servidorAPI2);
        servidorAPI1.setId(null);
        assertThat(servidorAPI1).isNotEqualTo(servidorAPI2);
    }
}
