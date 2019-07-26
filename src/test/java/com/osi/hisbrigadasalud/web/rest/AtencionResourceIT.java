package com.osi.hisbrigadasalud.web.rest;

import com.osi.hisbrigadasalud.HisBrigadaSaludApp;
import com.osi.hisbrigadasalud.domain.Atencion;
import com.osi.hisbrigadasalud.repository.AtencionRepository;
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
 * Integration tests for the {@Link AtencionResource} REST controller.
 */
@SpringBootTest(classes = HisBrigadaSaludApp.class)
public class AtencionResourceIT {

    private static final Instant DEFAULT_FECHA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_ESPECIALIDAD = "AAAAAAAAAA";
    private static final String UPDATED_ESPECIALIDAD = "BBBBBBBBBB";

    private static final String DEFAULT_OTRA_ESPECIALIDAD = "AAAAAAAAAA";
    private static final String UPDATED_OTRA_ESPECIALIDAD = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private AtencionRepository atencionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restAtencionMockMvc;

    private Atencion atencion;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AtencionResource atencionResource = new AtencionResource(atencionRepository);
        this.restAtencionMockMvc = MockMvcBuilders.standaloneSetup(atencionResource)
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
    public static Atencion createEntity() {
        Atencion atencion = new Atencion()
            .fecha(DEFAULT_FECHA)
            .especialidad(DEFAULT_ESPECIALIDAD)
            .otraEspecialidad(DEFAULT_OTRA_ESPECIALIDAD)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT);
        return atencion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Atencion createUpdatedEntity() {
        Atencion atencion = new Atencion()
            .fecha(UPDATED_FECHA)
            .especialidad(UPDATED_ESPECIALIDAD)
            .otraEspecialidad(UPDATED_OTRA_ESPECIALIDAD)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);
        return atencion;
    }

    @BeforeEach
    public void initTest() {
        atencionRepository.deleteAll();
        atencion = createEntity();
    }

    @Test
    public void createAtencion() throws Exception {
        int databaseSizeBeforeCreate = atencionRepository.findAll().size();

        // Create the Atencion
        restAtencionMockMvc.perform(post("/api/atencions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(atencion)))
            .andExpect(status().isCreated());

        // Validate the Atencion in the database
        List<Atencion> atencionList = atencionRepository.findAll();
        assertThat(atencionList).hasSize(databaseSizeBeforeCreate + 1);
        Atencion testAtencion = atencionList.get(atencionList.size() - 1);
        assertThat(testAtencion.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testAtencion.getEspecialidad()).isEqualTo(DEFAULT_ESPECIALIDAD);
        assertThat(testAtencion.getOtraEspecialidad()).isEqualTo(DEFAULT_OTRA_ESPECIALIDAD);
        assertThat(testAtencion.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testAtencion.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    public void createAtencionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = atencionRepository.findAll().size();

        // Create the Atencion with an existing ID
        atencion.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restAtencionMockMvc.perform(post("/api/atencions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(atencion)))
            .andExpect(status().isBadRequest());

        // Validate the Atencion in the database
        List<Atencion> atencionList = atencionRepository.findAll();
        assertThat(atencionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkFechaIsRequired() throws Exception {
        int databaseSizeBeforeTest = atencionRepository.findAll().size();
        // set the field null
        atencion.setFecha(null);

        // Create the Atencion, which fails.

        restAtencionMockMvc.perform(post("/api/atencions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(atencion)))
            .andExpect(status().isBadRequest());

        List<Atencion> atencionList = atencionRepository.findAll();
        assertThat(atencionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkEspecialidadIsRequired() throws Exception {
        int databaseSizeBeforeTest = atencionRepository.findAll().size();
        // set the field null
        atencion.setEspecialidad(null);

        // Create the Atencion, which fails.

        restAtencionMockMvc.perform(post("/api/atencions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(atencion)))
            .andExpect(status().isBadRequest());

        List<Atencion> atencionList = atencionRepository.findAll();
        assertThat(atencionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllAtencions() throws Exception {
        // Initialize the database
        atencionRepository.save(atencion);

        // Get all the atencionList
        restAtencionMockMvc.perform(get("/api/atencions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(atencion.getId())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].especialidad").value(hasItem(DEFAULT_ESPECIALIDAD.toString())))
            .andExpect(jsonPath("$.[*].otraEspecialidad").value(hasItem(DEFAULT_OTRA_ESPECIALIDAD.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }
    
    @Test
    public void getAtencion() throws Exception {
        // Initialize the database
        atencionRepository.save(atencion);

        // Get the atencion
        restAtencionMockMvc.perform(get("/api/atencions/{id}", atencion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(atencion.getId()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.especialidad").value(DEFAULT_ESPECIALIDAD.toString()))
            .andExpect(jsonPath("$.otraEspecialidad").value(DEFAULT_OTRA_ESPECIALIDAD.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    public void getNonExistingAtencion() throws Exception {
        // Get the atencion
        restAtencionMockMvc.perform(get("/api/atencions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateAtencion() throws Exception {
        // Initialize the database
        atencionRepository.save(atencion);

        int databaseSizeBeforeUpdate = atencionRepository.findAll().size();

        // Update the atencion
        Atencion updatedAtencion = atencionRepository.findById(atencion.getId()).get();
        updatedAtencion
            .fecha(UPDATED_FECHA)
            .especialidad(UPDATED_ESPECIALIDAD)
            .otraEspecialidad(UPDATED_OTRA_ESPECIALIDAD)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);

        restAtencionMockMvc.perform(put("/api/atencions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAtencion)))
            .andExpect(status().isOk());

        // Validate the Atencion in the database
        List<Atencion> atencionList = atencionRepository.findAll();
        assertThat(atencionList).hasSize(databaseSizeBeforeUpdate);
        Atencion testAtencion = atencionList.get(atencionList.size() - 1);
        assertThat(testAtencion.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testAtencion.getEspecialidad()).isEqualTo(UPDATED_ESPECIALIDAD);
        assertThat(testAtencion.getOtraEspecialidad()).isEqualTo(UPDATED_OTRA_ESPECIALIDAD);
        assertThat(testAtencion.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testAtencion.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    public void updateNonExistingAtencion() throws Exception {
        int databaseSizeBeforeUpdate = atencionRepository.findAll().size();

        // Create the Atencion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAtencionMockMvc.perform(put("/api/atencions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(atencion)))
            .andExpect(status().isBadRequest());

        // Validate the Atencion in the database
        List<Atencion> atencionList = atencionRepository.findAll();
        assertThat(atencionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteAtencion() throws Exception {
        // Initialize the database
        atencionRepository.save(atencion);

        int databaseSizeBeforeDelete = atencionRepository.findAll().size();

        // Delete the atencion
        restAtencionMockMvc.perform(delete("/api/atencions/{id}", atencion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Atencion> atencionList = atencionRepository.findAll();
        assertThat(atencionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Atencion.class);
        Atencion atencion1 = new Atencion();
        atencion1.setId("id1");
        Atencion atencion2 = new Atencion();
        atencion2.setId(atencion1.getId());
        assertThat(atencion1).isEqualTo(atencion2);
        atencion2.setId("id2");
        assertThat(atencion1).isNotEqualTo(atencion2);
        atencion1.setId(null);
        assertThat(atencion1).isNotEqualTo(atencion2);
    }
}
