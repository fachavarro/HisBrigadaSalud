package com.osi.hisbrigadasalud.web.rest;

import com.osi.hisbrigadasalud.HisBrigadaSaludApp;
import com.osi.hisbrigadasalud.domain.Procedimiento;
import com.osi.hisbrigadasalud.repository.ProcedimientoRepository;
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


import java.util.List;

import static com.osi.hisbrigadasalud.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link ProcedimientoResource} REST controller.
 */
@SpringBootTest(classes = HisBrigadaSaludApp.class)
public class ProcedimientoResourceIT {

    private static final String DEFAULT_NOMBRE_PROCEDIMIENTO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_PROCEDIMIENTO = "BBBBBBBBBB";

    @Autowired
    private ProcedimientoRepository procedimientoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restProcedimientoMockMvc;

    private Procedimiento procedimiento;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProcedimientoResource procedimientoResource = new ProcedimientoResource(procedimientoRepository);
        this.restProcedimientoMockMvc = MockMvcBuilders.standaloneSetup(procedimientoResource)
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
    public static Procedimiento createEntity() {
        Procedimiento procedimiento = new Procedimiento()
            .nombreProcedimiento(DEFAULT_NOMBRE_PROCEDIMIENTO);
        return procedimiento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Procedimiento createUpdatedEntity() {
        Procedimiento procedimiento = new Procedimiento()
            .nombreProcedimiento(UPDATED_NOMBRE_PROCEDIMIENTO);
        return procedimiento;
    }

    @BeforeEach
    public void initTest() {
        procedimientoRepository.deleteAll();
        procedimiento = createEntity();
    }

    @Test
    public void createProcedimiento() throws Exception {
        int databaseSizeBeforeCreate = procedimientoRepository.findAll().size();

        // Create the Procedimiento
        restProcedimientoMockMvc.perform(post("/api/procedimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(procedimiento)))
            .andExpect(status().isCreated());

        // Validate the Procedimiento in the database
        List<Procedimiento> procedimientoList = procedimientoRepository.findAll();
        assertThat(procedimientoList).hasSize(databaseSizeBeforeCreate + 1);
        Procedimiento testProcedimiento = procedimientoList.get(procedimientoList.size() - 1);
        assertThat(testProcedimiento.getNombreProcedimiento()).isEqualTo(DEFAULT_NOMBRE_PROCEDIMIENTO);
    }

    @Test
    public void createProcedimientoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = procedimientoRepository.findAll().size();

        // Create the Procedimiento with an existing ID
        procedimiento.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restProcedimientoMockMvc.perform(post("/api/procedimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(procedimiento)))
            .andExpect(status().isBadRequest());

        // Validate the Procedimiento in the database
        List<Procedimiento> procedimientoList = procedimientoRepository.findAll();
        assertThat(procedimientoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllProcedimientos() throws Exception {
        // Initialize the database
        procedimientoRepository.save(procedimiento);

        // Get all the procedimientoList
        restProcedimientoMockMvc.perform(get("/api/procedimientos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(procedimiento.getId())))
            .andExpect(jsonPath("$.[*].nombreProcedimiento").value(hasItem(DEFAULT_NOMBRE_PROCEDIMIENTO.toString())));
    }
    
    @Test
    public void getProcedimiento() throws Exception {
        // Initialize the database
        procedimientoRepository.save(procedimiento);

        // Get the procedimiento
        restProcedimientoMockMvc.perform(get("/api/procedimientos/{id}", procedimiento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(procedimiento.getId()))
            .andExpect(jsonPath("$.nombreProcedimiento").value(DEFAULT_NOMBRE_PROCEDIMIENTO.toString()));
    }

    @Test
    public void getNonExistingProcedimiento() throws Exception {
        // Get the procedimiento
        restProcedimientoMockMvc.perform(get("/api/procedimientos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateProcedimiento() throws Exception {
        // Initialize the database
        procedimientoRepository.save(procedimiento);

        int databaseSizeBeforeUpdate = procedimientoRepository.findAll().size();

        // Update the procedimiento
        Procedimiento updatedProcedimiento = procedimientoRepository.findById(procedimiento.getId()).get();
        updatedProcedimiento
            .nombreProcedimiento(UPDATED_NOMBRE_PROCEDIMIENTO);

        restProcedimientoMockMvc.perform(put("/api/procedimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProcedimiento)))
            .andExpect(status().isOk());

        // Validate the Procedimiento in the database
        List<Procedimiento> procedimientoList = procedimientoRepository.findAll();
        assertThat(procedimientoList).hasSize(databaseSizeBeforeUpdate);
        Procedimiento testProcedimiento = procedimientoList.get(procedimientoList.size() - 1);
        assertThat(testProcedimiento.getNombreProcedimiento()).isEqualTo(UPDATED_NOMBRE_PROCEDIMIENTO);
    }

    @Test
    public void updateNonExistingProcedimiento() throws Exception {
        int databaseSizeBeforeUpdate = procedimientoRepository.findAll().size();

        // Create the Procedimiento

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProcedimientoMockMvc.perform(put("/api/procedimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(procedimiento)))
            .andExpect(status().isBadRequest());

        // Validate the Procedimiento in the database
        List<Procedimiento> procedimientoList = procedimientoRepository.findAll();
        assertThat(procedimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteProcedimiento() throws Exception {
        // Initialize the database
        procedimientoRepository.save(procedimiento);

        int databaseSizeBeforeDelete = procedimientoRepository.findAll().size();

        // Delete the procedimiento
        restProcedimientoMockMvc.perform(delete("/api/procedimientos/{id}", procedimiento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Procedimiento> procedimientoList = procedimientoRepository.findAll();
        assertThat(procedimientoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Procedimiento.class);
        Procedimiento procedimiento1 = new Procedimiento();
        procedimiento1.setId("id1");
        Procedimiento procedimiento2 = new Procedimiento();
        procedimiento2.setId(procedimiento1.getId());
        assertThat(procedimiento1).isEqualTo(procedimiento2);
        procedimiento2.setId("id2");
        assertThat(procedimiento1).isNotEqualTo(procedimiento2);
        procedimiento1.setId(null);
        assertThat(procedimiento1).isNotEqualTo(procedimiento2);
    }
}
