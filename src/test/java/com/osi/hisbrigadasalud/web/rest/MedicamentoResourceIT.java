package com.osi.hisbrigadasalud.web.rest;

import com.osi.hisbrigadasalud.HisBrigadaSaludApp;
import com.osi.hisbrigadasalud.domain.Medicamento;
import com.osi.hisbrigadasalud.repository.MedicamentoRepository;
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
 * Integration tests for the {@Link MedicamentoResource} REST controller.
 */
@SpringBootTest(classes = HisBrigadaSaludApp.class)
public class MedicamentoResourceIT {

    private static final String DEFAULT_NOMBRE_MEDICAMENTO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_MEDICAMENTO = "BBBBBBBBBB";

    @Autowired
    private MedicamentoRepository medicamentoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restMedicamentoMockMvc;

    private Medicamento medicamento;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MedicamentoResource medicamentoResource = new MedicamentoResource(medicamentoRepository);
        this.restMedicamentoMockMvc = MockMvcBuilders.standaloneSetup(medicamentoResource)
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
    public static Medicamento createEntity() {
        Medicamento medicamento = new Medicamento()
            .nombreMedicamento(DEFAULT_NOMBRE_MEDICAMENTO);
        return medicamento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Medicamento createUpdatedEntity() {
        Medicamento medicamento = new Medicamento()
            .nombreMedicamento(UPDATED_NOMBRE_MEDICAMENTO);
        return medicamento;
    }

    @BeforeEach
    public void initTest() {
        medicamentoRepository.deleteAll();
        medicamento = createEntity();
    }

    @Test
    public void createMedicamento() throws Exception {
        int databaseSizeBeforeCreate = medicamentoRepository.findAll().size();

        // Create the Medicamento
        restMedicamentoMockMvc.perform(post("/api/medicamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medicamento)))
            .andExpect(status().isCreated());

        // Validate the Medicamento in the database
        List<Medicamento> medicamentoList = medicamentoRepository.findAll();
        assertThat(medicamentoList).hasSize(databaseSizeBeforeCreate + 1);
        Medicamento testMedicamento = medicamentoList.get(medicamentoList.size() - 1);
        assertThat(testMedicamento.getNombreMedicamento()).isEqualTo(DEFAULT_NOMBRE_MEDICAMENTO);
    }

    @Test
    public void createMedicamentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = medicamentoRepository.findAll().size();

        // Create the Medicamento with an existing ID
        medicamento.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedicamentoMockMvc.perform(post("/api/medicamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medicamento)))
            .andExpect(status().isBadRequest());

        // Validate the Medicamento in the database
        List<Medicamento> medicamentoList = medicamentoRepository.findAll();
        assertThat(medicamentoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllMedicamentos() throws Exception {
        // Initialize the database
        medicamentoRepository.save(medicamento);

        // Get all the medicamentoList
        restMedicamentoMockMvc.perform(get("/api/medicamentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medicamento.getId())))
            .andExpect(jsonPath("$.[*].nombreMedicamento").value(hasItem(DEFAULT_NOMBRE_MEDICAMENTO.toString())));
    }
    
    @Test
    public void getMedicamento() throws Exception {
        // Initialize the database
        medicamentoRepository.save(medicamento);

        // Get the medicamento
        restMedicamentoMockMvc.perform(get("/api/medicamentos/{id}", medicamento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(medicamento.getId()))
            .andExpect(jsonPath("$.nombreMedicamento").value(DEFAULT_NOMBRE_MEDICAMENTO.toString()));
    }

    @Test
    public void getNonExistingMedicamento() throws Exception {
        // Get the medicamento
        restMedicamentoMockMvc.perform(get("/api/medicamentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateMedicamento() throws Exception {
        // Initialize the database
        medicamentoRepository.save(medicamento);

        int databaseSizeBeforeUpdate = medicamentoRepository.findAll().size();

        // Update the medicamento
        Medicamento updatedMedicamento = medicamentoRepository.findById(medicamento.getId()).get();
        updatedMedicamento
            .nombreMedicamento(UPDATED_NOMBRE_MEDICAMENTO);

        restMedicamentoMockMvc.perform(put("/api/medicamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMedicamento)))
            .andExpect(status().isOk());

        // Validate the Medicamento in the database
        List<Medicamento> medicamentoList = medicamentoRepository.findAll();
        assertThat(medicamentoList).hasSize(databaseSizeBeforeUpdate);
        Medicamento testMedicamento = medicamentoList.get(medicamentoList.size() - 1);
        assertThat(testMedicamento.getNombreMedicamento()).isEqualTo(UPDATED_NOMBRE_MEDICAMENTO);
    }

    @Test
    public void updateNonExistingMedicamento() throws Exception {
        int databaseSizeBeforeUpdate = medicamentoRepository.findAll().size();

        // Create the Medicamento

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedicamentoMockMvc.perform(put("/api/medicamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medicamento)))
            .andExpect(status().isBadRequest());

        // Validate the Medicamento in the database
        List<Medicamento> medicamentoList = medicamentoRepository.findAll();
        assertThat(medicamentoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteMedicamento() throws Exception {
        // Initialize the database
        medicamentoRepository.save(medicamento);

        int databaseSizeBeforeDelete = medicamentoRepository.findAll().size();

        // Delete the medicamento
        restMedicamentoMockMvc.perform(delete("/api/medicamentos/{id}", medicamento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Medicamento> medicamentoList = medicamentoRepository.findAll();
        assertThat(medicamentoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Medicamento.class);
        Medicamento medicamento1 = new Medicamento();
        medicamento1.setId("id1");
        Medicamento medicamento2 = new Medicamento();
        medicamento2.setId(medicamento1.getId());
        assertThat(medicamento1).isEqualTo(medicamento2);
        medicamento2.setId("id2");
        assertThat(medicamento1).isNotEqualTo(medicamento2);
        medicamento1.setId(null);
        assertThat(medicamento1).isNotEqualTo(medicamento2);
    }
}
