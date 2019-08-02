package com.osi.hisbrigadasalud.web.rest;

import com.osi.hisbrigadasalud.HisBrigadaSaludApp;
import com.osi.hisbrigadasalud.domain.Brigada;
import com.osi.hisbrigadasalud.repository.BrigadaRepository;
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


import java.time.LocalDate;
import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.osi.hisbrigadasalud.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link BrigadaResource} REST controller.
 */
@SpringBootTest(classes = HisBrigadaSaludApp.class)
public class BrigadaResourceIT {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_LUGAR = "AAAAAAAAAA";
    private static final String UPDATED_LUGAR = "BBBBBBBBBB";

    private static final String DEFAULT_CIUDAD = "AAAAAAAAAA";
    private static final String UPDATED_CIUDAD = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHAI = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHAI = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHAF = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHAF = LocalDate.now(ZoneId.systemDefault());

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private BrigadaRepository brigadaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restBrigadaMockMvc;

    private Brigada brigada;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BrigadaResource brigadaResource = new BrigadaResource(brigadaRepository);
        this.restBrigadaMockMvc = MockMvcBuilders.standaloneSetup(brigadaResource)
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
    public static Brigada createEntity() {
        Brigada brigada = new Brigada()
            .descripcion(DEFAULT_DESCRIPCION)
            .lugar(DEFAULT_LUGAR)
            .ciudad(DEFAULT_CIUDAD)
            .fechai(DEFAULT_FECHAI)
            .fechaf(DEFAULT_FECHAF)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT);
        return brigada;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Brigada createUpdatedEntity() {
        Brigada brigada = new Brigada()
            .descripcion(UPDATED_DESCRIPCION)
            .lugar(UPDATED_LUGAR)
            .ciudad(UPDATED_CIUDAD)
            .fechai(UPDATED_FECHAI)
            .fechaf(UPDATED_FECHAF)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);
        return brigada;
    }

    @BeforeEach
    public void initTest() {
        brigadaRepository.deleteAll();
        brigada = createEntity();
    }

    @Test
    public void createBrigada() throws Exception {
        int databaseSizeBeforeCreate = brigadaRepository.findAll().size();

        // Create the Brigada
        restBrigadaMockMvc.perform(post("/api/brigadas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(brigada)))
            .andExpect(status().isCreated());

        // Validate the Brigada in the database
        List<Brigada> brigadaList = brigadaRepository.findAll();
        assertThat(brigadaList).hasSize(databaseSizeBeforeCreate + 1);
        Brigada testBrigada = brigadaList.get(brigadaList.size() - 1);
        assertThat(testBrigada.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testBrigada.getLugar()).isEqualTo(DEFAULT_LUGAR);
        assertThat(testBrigada.getCiudad()).isEqualTo(DEFAULT_CIUDAD);
        assertThat(testBrigada.getFechai()).isEqualTo(DEFAULT_FECHAI);
        assertThat(testBrigada.getFechaf()).isEqualTo(DEFAULT_FECHAF);
        assertThat(testBrigada.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testBrigada.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    public void createBrigadaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = brigadaRepository.findAll().size();

        // Create the Brigada with an existing ID
        brigada.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restBrigadaMockMvc.perform(post("/api/brigadas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(brigada)))
            .andExpect(status().isBadRequest());

        // Validate the Brigada in the database
        List<Brigada> brigadaList = brigadaRepository.findAll();
        assertThat(brigadaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkDescripcionIsRequired() throws Exception {
        int databaseSizeBeforeTest = brigadaRepository.findAll().size();
        // set the field null
        brigada.setDescripcion(null);

        // Create the Brigada, which fails.

        restBrigadaMockMvc.perform(post("/api/brigadas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(brigada)))
            .andExpect(status().isBadRequest());

        List<Brigada> brigadaList = brigadaRepository.findAll();
        assertThat(brigadaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkLugarIsRequired() throws Exception {
        int databaseSizeBeforeTest = brigadaRepository.findAll().size();
        // set the field null
        brigada.setLugar(null);

        // Create the Brigada, which fails.

        restBrigadaMockMvc.perform(post("/api/brigadas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(brigada)))
            .andExpect(status().isBadRequest());

        List<Brigada> brigadaList = brigadaRepository.findAll();
        assertThat(brigadaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkCiudadIsRequired() throws Exception {
        int databaseSizeBeforeTest = brigadaRepository.findAll().size();
        // set the field null
        brigada.setCiudad(null);

        // Create the Brigada, which fails.

        restBrigadaMockMvc.perform(post("/api/brigadas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(brigada)))
            .andExpect(status().isBadRequest());

        List<Brigada> brigadaList = brigadaRepository.findAll();
        assertThat(brigadaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkFechaiIsRequired() throws Exception {
        int databaseSizeBeforeTest = brigadaRepository.findAll().size();
        // set the field null
        brigada.setFechai(null);

        // Create the Brigada, which fails.

        restBrigadaMockMvc.perform(post("/api/brigadas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(brigada)))
            .andExpect(status().isBadRequest());

        List<Brigada> brigadaList = brigadaRepository.findAll();
        assertThat(brigadaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkFechafIsRequired() throws Exception {
        int databaseSizeBeforeTest = brigadaRepository.findAll().size();
        // set the field null
        brigada.setFechaf(null);

        // Create the Brigada, which fails.

        restBrigadaMockMvc.perform(post("/api/brigadas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(brigada)))
            .andExpect(status().isBadRequest());

        List<Brigada> brigadaList = brigadaRepository.findAll();
        assertThat(brigadaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllBrigadas() throws Exception {
        // Initialize the database
        brigadaRepository.save(brigada);

        // Get all the brigadaList
        restBrigadaMockMvc.perform(get("/api/brigadas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(brigada.getId())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].lugar").value(hasItem(DEFAULT_LUGAR.toString())))
            .andExpect(jsonPath("$.[*].ciudad").value(hasItem(DEFAULT_CIUDAD.toString())))
            .andExpect(jsonPath("$.[*].fechai").value(hasItem(DEFAULT_FECHAI.toString())))
            .andExpect(jsonPath("$.[*].fechaf").value(hasItem(DEFAULT_FECHAF.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }
    
    @Test
    public void getBrigada() throws Exception {
        // Initialize the database
        brigadaRepository.save(brigada);

        // Get the brigada
        restBrigadaMockMvc.perform(get("/api/brigadas/{id}", brigada.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(brigada.getId()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.lugar").value(DEFAULT_LUGAR.toString()))
            .andExpect(jsonPath("$.ciudad").value(DEFAULT_CIUDAD.toString()))
            .andExpect(jsonPath("$.fechai").value(DEFAULT_FECHAI.toString()))
            .andExpect(jsonPath("$.fechaf").value(DEFAULT_FECHAF.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    public void getNonExistingBrigada() throws Exception {
        // Get the brigada
        restBrigadaMockMvc.perform(get("/api/brigadas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateBrigada() throws Exception {
        // Initialize the database
        brigadaRepository.save(brigada);

        int databaseSizeBeforeUpdate = brigadaRepository.findAll().size();

        // Update the brigada
        Brigada updatedBrigada = brigadaRepository.findById(brigada.getId()).get();
        updatedBrigada
            .descripcion(UPDATED_DESCRIPCION)
            .lugar(UPDATED_LUGAR)
            .ciudad(UPDATED_CIUDAD)
            .fechai(UPDATED_FECHAI)
            .fechaf(UPDATED_FECHAF)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);

        restBrigadaMockMvc.perform(put("/api/brigadas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBrigada)))
            .andExpect(status().isOk());

        // Validate the Brigada in the database
        List<Brigada> brigadaList = brigadaRepository.findAll();
        assertThat(brigadaList).hasSize(databaseSizeBeforeUpdate);
        Brigada testBrigada = brigadaList.get(brigadaList.size() - 1);
        assertThat(testBrigada.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testBrigada.getLugar()).isEqualTo(UPDATED_LUGAR);
        assertThat(testBrigada.getCiudad()).isEqualTo(UPDATED_CIUDAD);
        assertThat(testBrigada.getFechai()).isEqualTo(UPDATED_FECHAI);
        assertThat(testBrigada.getFechaf()).isEqualTo(UPDATED_FECHAF);
        assertThat(testBrigada.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testBrigada.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    public void updateNonExistingBrigada() throws Exception {
        int databaseSizeBeforeUpdate = brigadaRepository.findAll().size();

        // Create the Brigada

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBrigadaMockMvc.perform(put("/api/brigadas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(brigada)))
            .andExpect(status().isBadRequest());

        // Validate the Brigada in the database
        List<Brigada> brigadaList = brigadaRepository.findAll();
        assertThat(brigadaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteBrigada() throws Exception {
        // Initialize the database
        brigadaRepository.save(brigada);

        int databaseSizeBeforeDelete = brigadaRepository.findAll().size();

        // Delete the brigada
        restBrigadaMockMvc.perform(delete("/api/brigadas/{id}", brigada.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Brigada> brigadaList = brigadaRepository.findAll();
        assertThat(brigadaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Brigada.class);
        Brigada brigada1 = new Brigada();
        brigada1.setId("id1");
        Brigada brigada2 = new Brigada();
        brigada2.setId(brigada1.getId());
        assertThat(brigada1).isEqualTo(brigada2);
        brigada2.setId("id2");
        assertThat(brigada1).isNotEqualTo(brigada2);
        brigada1.setId(null);
        assertThat(brigada1).isNotEqualTo(brigada2);
    }
}
