package com.osi.hisbrigadasalud.web.rest;

import com.osi.hisbrigadasalud.HisBrigadaSaludApp;
import com.osi.hisbrigadasalud.domain.Atencion;
import com.osi.hisbrigadasalud.repository.AtencionRepository;
import com.osi.hisbrigadasalud.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static com.osi.hisbrigadasalud.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
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

    private static final String DEFAULT_MOTIVO_CONSULTA = "AAAAAAAAAA";
    private static final String UPDATED_MOTIVO_CONSULTA = "BBBBBBBBBB";

    private static final String DEFAULT_ENFERMEDAD_ACTUAL = "AAAAAAAAAA";
    private static final String UPDATED_ENFERMEDAD_ACTUAL = "BBBBBBBBBB";

    private static final Boolean DEFAULT_HIPERTENSION_ARTERIAL = false;
    private static final Boolean UPDATED_HIPERTENSION_ARTERIAL = true;

    private static final Boolean DEFAULT_DIABETES_MELLITUS = false;
    private static final Boolean UPDATED_DIABETES_MELLITUS = true;

    private static final Boolean DEFAULT_CANCER_ANTECEDENTE_PATOLOGICO = false;
    private static final Boolean UPDATED_CANCER_ANTECEDENTE_PATOLOGICO = true;

    private static final Boolean DEFAULT_TUBERCULOSIS = false;
    private static final Boolean UPDATED_TUBERCULOSIS = true;

    private static final Boolean DEFAULT_INSUFICIENCIA_RENAL = false;
    private static final Boolean UPDATED_INSUFICIENCIA_RENAL = true;

    private static final Boolean DEFAULT_V_IH_SIDA = false;
    private static final Boolean UPDATED_V_IH_SIDA = true;

    private static final Boolean DEFAULT_OTRO_ANTECEDENTE_PATOLOGICO = false;
    private static final Boolean UPDATED_OTRO_ANTECEDENTE_PATOLOGICO = true;

    private static final String DEFAULT_DESCRIPCION_OTRO_ANTECEDENTE_PATOLOGICO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION_OTRO_ANTECEDENTE_PATOLOGICO = "BBBBBBBBBB";

    private static final Boolean DEFAULT_CANCER_ANTECEDENTE_QUIRURGICO = false;
    private static final Boolean UPDATED_CANCER_ANTECEDENTE_QUIRURGICO = true;

    private static final Boolean DEFAULT_POMEROY = false;
    private static final Boolean UPDATED_POMEROY = true;

    private static final Boolean DEFAULT_OTRO_ANTECEDENTE_QUIRURGICO = false;
    private static final Boolean UPDATED_OTRO_ANTECEDENTE_QUIRURGICO = true;

    private static final String DEFAULT_DESCRIPCION_OTRO_ANTECEDENTE_QUIRURGICO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION_OTRO_ANTECEDENTE_QUIRURGICO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_F_UR = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_F_UR = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_FORMULA_OBSTRETICA = false;
    private static final Boolean UPDATED_FORMULA_OBSTRETICA = true;

    private static final Integer DEFAULT_G = 1;
    private static final Integer UPDATED_G = 2;

    private static final Integer DEFAULT_P = 1;
    private static final Integer UPDATED_P = 2;

    private static final Integer DEFAULT_C = 1;
    private static final Integer UPDATED_C = 2;

    private static final Integer DEFAULT_A = 1;
    private static final Integer UPDATED_A = 2;

    private static final Integer DEFAULT_V = 1;
    private static final Integer UPDATED_V = 2;

    private static final String DEFAULT_PLANIFICACION_FAMILIAR = "AAAAAAAAAA";
    private static final String UPDATED_PLANIFICACION_FAMILIAR = "BBBBBBBBBB";

    private static final String DEFAULT_FECHA_ULTIMA_CITOLOGIA = "AAAAAAAAAA";
    private static final String UPDATED_FECHA_ULTIMA_CITOLOGIA = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_ULTIMO_PARTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ULTIMO_PARTO = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_MAMOGRAFIA = false;
    private static final Boolean UPDATED_MAMOGRAFIA = true;

    private static final String DEFAULT_MEDICAMENTOS_ANTECEDENTES = "AAAAAAAAAA";
    private static final String UPDATED_MEDICAMENTOS_ANTECEDENTES = "BBBBBBBBBB";

    private static final String DEFAULT_ESQUEMA_VACUNACION = "AAAAAAAAAA";
    private static final String UPDATED_ESQUEMA_VACUNACION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_FUMA = false;
    private static final Boolean UPDATED_FUMA = true;

    private static final Boolean DEFAULT_ALCOHOL = false;
    private static final Boolean UPDATED_ALCOHOL = true;

    private static final Boolean DEFAULT_SUSTANCIAS_PSICOACTIVAS = false;
    private static final Boolean UPDATED_SUSTANCIAS_PSICOACTIVAS = true;

    private static final String DEFAULT_REVISION_POR_SISTEMAS = "AAAAAAAAAA";
    private static final String UPDATED_REVISION_POR_SISTEMAS = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_PESO = new BigDecimal(1);
    private static final BigDecimal UPDATED_PESO = new BigDecimal(2);

    private static final BigDecimal DEFAULT_TALLA = new BigDecimal(1);
    private static final BigDecimal UPDATED_TALLA = new BigDecimal(2);

    private static final BigDecimal DEFAULT_I_MC = new BigDecimal(1);
    private static final BigDecimal UPDATED_I_MC = new BigDecimal(2);

    private static final Integer DEFAULT_F_C = 1;
    private static final Integer UPDATED_F_C = 2;

    private static final Integer DEFAULT_F_R = 1;
    private static final Integer UPDATED_F_R = 2;

    private static final BigDecimal DEFAULT_TEMPERATURA = new BigDecimal(1);
    private static final BigDecimal UPDATED_TEMPERATURA = new BigDecimal(2);

    private static final Integer DEFAULT_SATURACION = 1;
    private static final Integer UPDATED_SATURACION = 2;

    private static final BigDecimal DEFAULT_HEMOGLOBINA = new BigDecimal(1);
    private static final BigDecimal UPDATED_HEMOGLOBINA = new BigDecimal(2);

    private static final Integer DEFAULT_GLUCOMETRIA = 1;
    private static final Integer UPDATED_GLUCOMETRIA = 2;

    private static final BigDecimal DEFAULT_CIRCUNFERENCIA_BRAZO = new BigDecimal(1);
    private static final BigDecimal UPDATED_CIRCUNFERENCIA_BRAZO = new BigDecimal(2);

    private static final BigDecimal DEFAULT_CIRCUNFERENCIA_ABDOMINAL = new BigDecimal(1);
    private static final BigDecimal UPDATED_CIRCUNFERENCIA_ABDOMINAL = new BigDecimal(2);

    private static final String DEFAULT_HALLAZGOS_EXAMEN_FISICO = "AAAAAAAAAA";
    private static final String UPDATED_HALLAZGOS_EXAMEN_FISICO = "BBBBBBBBBB";

    private static final String DEFAULT_VALORACION_NUTRICIONAL = "AAAAAAAAAA";
    private static final String UPDATED_VALORACION_NUTRICIONAL = "BBBBBBBBBB";

    private static final String DEFAULT_DIAGNOSTICO_PRINCIPAL = "AAAAAAAAAA";
    private static final String UPDATED_DIAGNOSTICO_PRINCIPAL = "BBBBBBBBBB";

    private static final String DEFAULT_DIAGNOSTICO_SECUNDARIO = "AAAAAAAAAA";
    private static final String UPDATED_DIAGNOSTICO_SECUNDARIO = "BBBBBBBBBB";

    private static final String DEFAULT_OBSERVACIONES_TRATAMIENTO = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES_TRATAMIENTO = "BBBBBBBBBB";

    private static final String DEFAULT_RECOMENDACIONES = "AAAAAAAAAA";
    private static final String UPDATED_RECOMENDACIONES = "BBBBBBBBBB";

    private static final String DEFAULT_DESTINO = "AAAAAAAAAA";
    private static final String UPDATED_DESTINO = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private AtencionRepository atencionRepository;

    @Mock
    private AtencionRepository atencionRepositoryMock;

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
            .motivoConsulta(DEFAULT_MOTIVO_CONSULTA)
            .enfermedadActual(DEFAULT_ENFERMEDAD_ACTUAL)
            .hipertensionArterial(DEFAULT_HIPERTENSION_ARTERIAL)
            .diabetesMellitus(DEFAULT_DIABETES_MELLITUS)
            .cancerAntecedentePatologico(DEFAULT_CANCER_ANTECEDENTE_PATOLOGICO)
            .tuberculosis(DEFAULT_TUBERCULOSIS)
            .insuficienciaRenal(DEFAULT_INSUFICIENCIA_RENAL)
            .vIHSida(DEFAULT_V_IH_SIDA)
            .otroAntecedentePatologico(DEFAULT_OTRO_ANTECEDENTE_PATOLOGICO)
            .descripcionOtroAntecedentePatologico(DEFAULT_DESCRIPCION_OTRO_ANTECEDENTE_PATOLOGICO)
            .cancerAntecedenteQuirurgico(DEFAULT_CANCER_ANTECEDENTE_QUIRURGICO)
            .pomeroy(DEFAULT_POMEROY)
            .otroAntecedenteQuirurgico(DEFAULT_OTRO_ANTECEDENTE_QUIRURGICO)
            .descripcionOtroAntecedenteQuirurgico(DEFAULT_DESCRIPCION_OTRO_ANTECEDENTE_QUIRURGICO)
            .fUR(DEFAULT_F_UR)
            .formulaObstretica(DEFAULT_FORMULA_OBSTRETICA)
            .g(DEFAULT_G)
            .p(DEFAULT_P)
            .c(DEFAULT_C)
            .a(DEFAULT_A)
            .v(DEFAULT_V)
            .planificacionFamiliar(DEFAULT_PLANIFICACION_FAMILIAR)
            .fechaUltimaCitologia(DEFAULT_FECHA_ULTIMA_CITOLOGIA)
            .ultimoParto(DEFAULT_ULTIMO_PARTO)
            .mamografia(DEFAULT_MAMOGRAFIA)
            .medicamentosAntecedentes(DEFAULT_MEDICAMENTOS_ANTECEDENTES)
            .esquemaVacunacion(DEFAULT_ESQUEMA_VACUNACION)
            .fuma(DEFAULT_FUMA)
            .alcohol(DEFAULT_ALCOHOL)
            .sustanciasPsicoactivas(DEFAULT_SUSTANCIAS_PSICOACTIVAS)
            .revisionPorSistemas(DEFAULT_REVISION_POR_SISTEMAS)
            .peso(DEFAULT_PESO)
            .talla(DEFAULT_TALLA)
            .iMC(DEFAULT_I_MC)
            .fC(DEFAULT_F_C)
            .fR(DEFAULT_F_R)
            .temperatura(DEFAULT_TEMPERATURA)
            .saturacion(DEFAULT_SATURACION)
            .hemoglobina(DEFAULT_HEMOGLOBINA)
            .glucometria(DEFAULT_GLUCOMETRIA)
            .circunferenciaBrazo(DEFAULT_CIRCUNFERENCIA_BRAZO)
            .circunferenciaAbdominal(DEFAULT_CIRCUNFERENCIA_ABDOMINAL)
            .hallazgosExamenFisico(DEFAULT_HALLAZGOS_EXAMEN_FISICO)
            .valoracionNutricional(DEFAULT_VALORACION_NUTRICIONAL)
            .diagnosticoPrincipal(DEFAULT_DIAGNOSTICO_PRINCIPAL)
            .diagnosticoSecundario(DEFAULT_DIAGNOSTICO_SECUNDARIO)
            .observacionesTratamiento(DEFAULT_OBSERVACIONES_TRATAMIENTO)
            .recomendaciones(DEFAULT_RECOMENDACIONES)
            .destino(DEFAULT_DESTINO)
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
            .motivoConsulta(UPDATED_MOTIVO_CONSULTA)
            .enfermedadActual(UPDATED_ENFERMEDAD_ACTUAL)
            .hipertensionArterial(UPDATED_HIPERTENSION_ARTERIAL)
            .diabetesMellitus(UPDATED_DIABETES_MELLITUS)
            .cancerAntecedentePatologico(UPDATED_CANCER_ANTECEDENTE_PATOLOGICO)
            .tuberculosis(UPDATED_TUBERCULOSIS)
            .insuficienciaRenal(UPDATED_INSUFICIENCIA_RENAL)
            .vIHSida(UPDATED_V_IH_SIDA)
            .otroAntecedentePatologico(UPDATED_OTRO_ANTECEDENTE_PATOLOGICO)
            .descripcionOtroAntecedentePatologico(UPDATED_DESCRIPCION_OTRO_ANTECEDENTE_PATOLOGICO)
            .cancerAntecedenteQuirurgico(UPDATED_CANCER_ANTECEDENTE_QUIRURGICO)
            .pomeroy(UPDATED_POMEROY)
            .otroAntecedenteQuirurgico(UPDATED_OTRO_ANTECEDENTE_QUIRURGICO)
            .descripcionOtroAntecedenteQuirurgico(UPDATED_DESCRIPCION_OTRO_ANTECEDENTE_QUIRURGICO)
            .fUR(UPDATED_F_UR)
            .formulaObstretica(UPDATED_FORMULA_OBSTRETICA)
            .g(UPDATED_G)
            .p(UPDATED_P)
            .c(UPDATED_C)
            .a(UPDATED_A)
            .v(UPDATED_V)
            .planificacionFamiliar(UPDATED_PLANIFICACION_FAMILIAR)
            .fechaUltimaCitologia(UPDATED_FECHA_ULTIMA_CITOLOGIA)
            .ultimoParto(UPDATED_ULTIMO_PARTO)
            .mamografia(UPDATED_MAMOGRAFIA)
            .medicamentosAntecedentes(UPDATED_MEDICAMENTOS_ANTECEDENTES)
            .esquemaVacunacion(UPDATED_ESQUEMA_VACUNACION)
            .fuma(UPDATED_FUMA)
            .alcohol(UPDATED_ALCOHOL)
            .sustanciasPsicoactivas(UPDATED_SUSTANCIAS_PSICOACTIVAS)
            .revisionPorSistemas(UPDATED_REVISION_POR_SISTEMAS)
            .peso(UPDATED_PESO)
            .talla(UPDATED_TALLA)
            .iMC(UPDATED_I_MC)
            .fC(UPDATED_F_C)
            .fR(UPDATED_F_R)
            .temperatura(UPDATED_TEMPERATURA)
            .saturacion(UPDATED_SATURACION)
            .hemoglobina(UPDATED_HEMOGLOBINA)
            .glucometria(UPDATED_GLUCOMETRIA)
            .circunferenciaBrazo(UPDATED_CIRCUNFERENCIA_BRAZO)
            .circunferenciaAbdominal(UPDATED_CIRCUNFERENCIA_ABDOMINAL)
            .hallazgosExamenFisico(UPDATED_HALLAZGOS_EXAMEN_FISICO)
            .valoracionNutricional(UPDATED_VALORACION_NUTRICIONAL)
            .diagnosticoPrincipal(UPDATED_DIAGNOSTICO_PRINCIPAL)
            .diagnosticoSecundario(UPDATED_DIAGNOSTICO_SECUNDARIO)
            .observacionesTratamiento(UPDATED_OBSERVACIONES_TRATAMIENTO)
            .recomendaciones(UPDATED_RECOMENDACIONES)
            .destino(UPDATED_DESTINO)
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
        assertThat(testAtencion.getMotivoConsulta()).isEqualTo(DEFAULT_MOTIVO_CONSULTA);
        assertThat(testAtencion.getEnfermedadActual()).isEqualTo(DEFAULT_ENFERMEDAD_ACTUAL);
        assertThat(testAtencion.isHipertensionArterial()).isEqualTo(DEFAULT_HIPERTENSION_ARTERIAL);
        assertThat(testAtencion.isDiabetesMellitus()).isEqualTo(DEFAULT_DIABETES_MELLITUS);
        assertThat(testAtencion.isCancerAntecedentePatologico()).isEqualTo(DEFAULT_CANCER_ANTECEDENTE_PATOLOGICO);
        assertThat(testAtencion.isTuberculosis()).isEqualTo(DEFAULT_TUBERCULOSIS);
        assertThat(testAtencion.isInsuficienciaRenal()).isEqualTo(DEFAULT_INSUFICIENCIA_RENAL);
        assertThat(testAtencion.isvIHSida()).isEqualTo(DEFAULT_V_IH_SIDA);
        assertThat(testAtencion.isOtroAntecedentePatologico()).isEqualTo(DEFAULT_OTRO_ANTECEDENTE_PATOLOGICO);
        assertThat(testAtencion.getDescripcionOtroAntecedentePatologico()).isEqualTo(DEFAULT_DESCRIPCION_OTRO_ANTECEDENTE_PATOLOGICO);
        assertThat(testAtencion.isCancerAntecedenteQuirurgico()).isEqualTo(DEFAULT_CANCER_ANTECEDENTE_QUIRURGICO);
        assertThat(testAtencion.isPomeroy()).isEqualTo(DEFAULT_POMEROY);
        assertThat(testAtencion.isOtroAntecedenteQuirurgico()).isEqualTo(DEFAULT_OTRO_ANTECEDENTE_QUIRURGICO);
        assertThat(testAtencion.getDescripcionOtroAntecedenteQuirurgico()).isEqualTo(DEFAULT_DESCRIPCION_OTRO_ANTECEDENTE_QUIRURGICO);
        assertThat(testAtencion.getfUR()).isEqualTo(DEFAULT_F_UR);
        assertThat(testAtencion.isFormulaObstretica()).isEqualTo(DEFAULT_FORMULA_OBSTRETICA);
        assertThat(testAtencion.getG()).isEqualTo(DEFAULT_G);
        assertThat(testAtencion.getP()).isEqualTo(DEFAULT_P);
        assertThat(testAtencion.getC()).isEqualTo(DEFAULT_C);
        assertThat(testAtencion.getA()).isEqualTo(DEFAULT_A);
        assertThat(testAtencion.getV()).isEqualTo(DEFAULT_V);
        assertThat(testAtencion.getPlanificacionFamiliar()).isEqualTo(DEFAULT_PLANIFICACION_FAMILIAR);
        assertThat(testAtencion.getFechaUltimaCitologia()).isEqualTo(DEFAULT_FECHA_ULTIMA_CITOLOGIA);
        assertThat(testAtencion.getUltimoParto()).isEqualTo(DEFAULT_ULTIMO_PARTO);
        assertThat(testAtencion.isMamografia()).isEqualTo(DEFAULT_MAMOGRAFIA);
        assertThat(testAtencion.getMedicamentosAntecedentes()).isEqualTo(DEFAULT_MEDICAMENTOS_ANTECEDENTES);
        assertThat(testAtencion.getEsquemaVacunacion()).isEqualTo(DEFAULT_ESQUEMA_VACUNACION);
        assertThat(testAtencion.isFuma()).isEqualTo(DEFAULT_FUMA);
        assertThat(testAtencion.isAlcohol()).isEqualTo(DEFAULT_ALCOHOL);
        assertThat(testAtencion.isSustanciasPsicoactivas()).isEqualTo(DEFAULT_SUSTANCIAS_PSICOACTIVAS);
        assertThat(testAtencion.getRevisionPorSistemas()).isEqualTo(DEFAULT_REVISION_POR_SISTEMAS);
        assertThat(testAtencion.getPeso()).isEqualTo(DEFAULT_PESO);
        assertThat(testAtencion.getTalla()).isEqualTo(DEFAULT_TALLA);
        assertThat(testAtencion.getiMC()).isEqualTo(DEFAULT_I_MC);
        assertThat(testAtencion.getfC()).isEqualTo(DEFAULT_F_C);
        assertThat(testAtencion.getfR()).isEqualTo(DEFAULT_F_R);
        assertThat(testAtencion.getTemperatura()).isEqualTo(DEFAULT_TEMPERATURA);
        assertThat(testAtencion.getSaturacion()).isEqualTo(DEFAULT_SATURACION);
        assertThat(testAtencion.getHemoglobina()).isEqualTo(DEFAULT_HEMOGLOBINA);
        assertThat(testAtencion.getGlucometria()).isEqualTo(DEFAULT_GLUCOMETRIA);
        assertThat(testAtencion.getCircunferenciaBrazo()).isEqualTo(DEFAULT_CIRCUNFERENCIA_BRAZO);
        assertThat(testAtencion.getCircunferenciaAbdominal()).isEqualTo(DEFAULT_CIRCUNFERENCIA_ABDOMINAL);
        assertThat(testAtencion.getHallazgosExamenFisico()).isEqualTo(DEFAULT_HALLAZGOS_EXAMEN_FISICO);
        assertThat(testAtencion.getValoracionNutricional()).isEqualTo(DEFAULT_VALORACION_NUTRICIONAL);
        assertThat(testAtencion.getDiagnosticoPrincipal()).isEqualTo(DEFAULT_DIAGNOSTICO_PRINCIPAL);
        assertThat(testAtencion.getDiagnosticoSecundario()).isEqualTo(DEFAULT_DIAGNOSTICO_SECUNDARIO);
        assertThat(testAtencion.getObservacionesTratamiento()).isEqualTo(DEFAULT_OBSERVACIONES_TRATAMIENTO);
        assertThat(testAtencion.getRecomendaciones()).isEqualTo(DEFAULT_RECOMENDACIONES);
        assertThat(testAtencion.getDestino()).isEqualTo(DEFAULT_DESTINO);
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
            .andExpect(jsonPath("$.[*].motivoConsulta").value(hasItem(DEFAULT_MOTIVO_CONSULTA.toString())))
            .andExpect(jsonPath("$.[*].enfermedadActual").value(hasItem(DEFAULT_ENFERMEDAD_ACTUAL.toString())))
            .andExpect(jsonPath("$.[*].hipertensionArterial").value(hasItem(DEFAULT_HIPERTENSION_ARTERIAL.booleanValue())))
            .andExpect(jsonPath("$.[*].diabetesMellitus").value(hasItem(DEFAULT_DIABETES_MELLITUS.booleanValue())))
            .andExpect(jsonPath("$.[*].cancerAntecedentePatologico").value(hasItem(DEFAULT_CANCER_ANTECEDENTE_PATOLOGICO.booleanValue())))
            .andExpect(jsonPath("$.[*].tuberculosis").value(hasItem(DEFAULT_TUBERCULOSIS.booleanValue())))
            .andExpect(jsonPath("$.[*].insuficienciaRenal").value(hasItem(DEFAULT_INSUFICIENCIA_RENAL.booleanValue())))
            .andExpect(jsonPath("$.[*].vIHSida").value(hasItem(DEFAULT_V_IH_SIDA.booleanValue())))
            .andExpect(jsonPath("$.[*].otroAntecedentePatologico").value(hasItem(DEFAULT_OTRO_ANTECEDENTE_PATOLOGICO.booleanValue())))
            .andExpect(jsonPath("$.[*].descripcionOtroAntecedentePatologico").value(hasItem(DEFAULT_DESCRIPCION_OTRO_ANTECEDENTE_PATOLOGICO.toString())))
            .andExpect(jsonPath("$.[*].cancerAntecedenteQuirurgico").value(hasItem(DEFAULT_CANCER_ANTECEDENTE_QUIRURGICO.booleanValue())))
            .andExpect(jsonPath("$.[*].pomeroy").value(hasItem(DEFAULT_POMEROY.booleanValue())))
            .andExpect(jsonPath("$.[*].otroAntecedenteQuirurgico").value(hasItem(DEFAULT_OTRO_ANTECEDENTE_QUIRURGICO.booleanValue())))
            .andExpect(jsonPath("$.[*].descripcionOtroAntecedenteQuirurgico").value(hasItem(DEFAULT_DESCRIPCION_OTRO_ANTECEDENTE_QUIRURGICO.toString())))
            .andExpect(jsonPath("$.[*].fUR").value(hasItem(DEFAULT_F_UR.toString())))
            .andExpect(jsonPath("$.[*].formulaObstretica").value(hasItem(DEFAULT_FORMULA_OBSTRETICA.booleanValue())))
            .andExpect(jsonPath("$.[*].g").value(hasItem(DEFAULT_G)))
            .andExpect(jsonPath("$.[*].p").value(hasItem(DEFAULT_P)))
            .andExpect(jsonPath("$.[*].c").value(hasItem(DEFAULT_C)))
            .andExpect(jsonPath("$.[*].a").value(hasItem(DEFAULT_A)))
            .andExpect(jsonPath("$.[*].v").value(hasItem(DEFAULT_V)))
            .andExpect(jsonPath("$.[*].planificacionFamiliar").value(hasItem(DEFAULT_PLANIFICACION_FAMILIAR.toString())))
            .andExpect(jsonPath("$.[*].fechaUltimaCitologia").value(hasItem(DEFAULT_FECHA_ULTIMA_CITOLOGIA.toString())))
            .andExpect(jsonPath("$.[*].ultimoParto").value(hasItem(DEFAULT_ULTIMO_PARTO.toString())))
            .andExpect(jsonPath("$.[*].mamografia").value(hasItem(DEFAULT_MAMOGRAFIA.booleanValue())))
            .andExpect(jsonPath("$.[*].medicamentosAntecedentes").value(hasItem(DEFAULT_MEDICAMENTOS_ANTECEDENTES.toString())))
            .andExpect(jsonPath("$.[*].esquemaVacunacion").value(hasItem(DEFAULT_ESQUEMA_VACUNACION.toString())))
            .andExpect(jsonPath("$.[*].fuma").value(hasItem(DEFAULT_FUMA.booleanValue())))
            .andExpect(jsonPath("$.[*].alcohol").value(hasItem(DEFAULT_ALCOHOL.booleanValue())))
            .andExpect(jsonPath("$.[*].sustanciasPsicoactivas").value(hasItem(DEFAULT_SUSTANCIAS_PSICOACTIVAS.booleanValue())))
            .andExpect(jsonPath("$.[*].revisionPorSistemas").value(hasItem(DEFAULT_REVISION_POR_SISTEMAS.toString())))
            .andExpect(jsonPath("$.[*].peso").value(hasItem(DEFAULT_PESO.intValue())))
            .andExpect(jsonPath("$.[*].talla").value(hasItem(DEFAULT_TALLA.intValue())))
            .andExpect(jsonPath("$.[*].iMC").value(hasItem(DEFAULT_I_MC.intValue())))
            .andExpect(jsonPath("$.[*].fC").value(hasItem(DEFAULT_F_C)))
            .andExpect(jsonPath("$.[*].fR").value(hasItem(DEFAULT_F_R)))
            .andExpect(jsonPath("$.[*].temperatura").value(hasItem(DEFAULT_TEMPERATURA.intValue())))
            .andExpect(jsonPath("$.[*].saturacion").value(hasItem(DEFAULT_SATURACION)))
            .andExpect(jsonPath("$.[*].hemoglobina").value(hasItem(DEFAULT_HEMOGLOBINA.intValue())))
            .andExpect(jsonPath("$.[*].glucometria").value(hasItem(DEFAULT_GLUCOMETRIA)))
            .andExpect(jsonPath("$.[*].circunferenciaBrazo").value(hasItem(DEFAULT_CIRCUNFERENCIA_BRAZO.intValue())))
            .andExpect(jsonPath("$.[*].circunferenciaAbdominal").value(hasItem(DEFAULT_CIRCUNFERENCIA_ABDOMINAL.intValue())))
            .andExpect(jsonPath("$.[*].hallazgosExamenFisico").value(hasItem(DEFAULT_HALLAZGOS_EXAMEN_FISICO.toString())))
            .andExpect(jsonPath("$.[*].valoracionNutricional").value(hasItem(DEFAULT_VALORACION_NUTRICIONAL.toString())))
            .andExpect(jsonPath("$.[*].diagnosticoPrincipal").value(hasItem(DEFAULT_DIAGNOSTICO_PRINCIPAL.toString())))
            .andExpect(jsonPath("$.[*].diagnosticoSecundario").value(hasItem(DEFAULT_DIAGNOSTICO_SECUNDARIO.toString())))
            .andExpect(jsonPath("$.[*].observacionesTratamiento").value(hasItem(DEFAULT_OBSERVACIONES_TRATAMIENTO.toString())))
            .andExpect(jsonPath("$.[*].recomendaciones").value(hasItem(DEFAULT_RECOMENDACIONES.toString())))
            .andExpect(jsonPath("$.[*].destino").value(hasItem(DEFAULT_DESTINO.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllAtencionsWithEagerRelationshipsIsEnabled() throws Exception {
        AtencionResource atencionResource = new AtencionResource(atencionRepositoryMock);
        when(atencionRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restAtencionMockMvc = MockMvcBuilders.standaloneSetup(atencionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restAtencionMockMvc.perform(get("/api/atencions?eagerload=true"))
        .andExpect(status().isOk());

        verify(atencionRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllAtencionsWithEagerRelationshipsIsNotEnabled() throws Exception {
        AtencionResource atencionResource = new AtencionResource(atencionRepositoryMock);
            when(atencionRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restAtencionMockMvc = MockMvcBuilders.standaloneSetup(atencionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restAtencionMockMvc.perform(get("/api/atencions?eagerload=true"))
        .andExpect(status().isOk());

            verify(atencionRepositoryMock, times(1)).findAllWithEagerRelationships(any());
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
            .andExpect(jsonPath("$.motivoConsulta").value(DEFAULT_MOTIVO_CONSULTA.toString()))
            .andExpect(jsonPath("$.enfermedadActual").value(DEFAULT_ENFERMEDAD_ACTUAL.toString()))
            .andExpect(jsonPath("$.hipertensionArterial").value(DEFAULT_HIPERTENSION_ARTERIAL.booleanValue()))
            .andExpect(jsonPath("$.diabetesMellitus").value(DEFAULT_DIABETES_MELLITUS.booleanValue()))
            .andExpect(jsonPath("$.cancerAntecedentePatologico").value(DEFAULT_CANCER_ANTECEDENTE_PATOLOGICO.booleanValue()))
            .andExpect(jsonPath("$.tuberculosis").value(DEFAULT_TUBERCULOSIS.booleanValue()))
            .andExpect(jsonPath("$.insuficienciaRenal").value(DEFAULT_INSUFICIENCIA_RENAL.booleanValue()))
            .andExpect(jsonPath("$.vIHSida").value(DEFAULT_V_IH_SIDA.booleanValue()))
            .andExpect(jsonPath("$.otroAntecedentePatologico").value(DEFAULT_OTRO_ANTECEDENTE_PATOLOGICO.booleanValue()))
            .andExpect(jsonPath("$.descripcionOtroAntecedentePatologico").value(DEFAULT_DESCRIPCION_OTRO_ANTECEDENTE_PATOLOGICO.toString()))
            .andExpect(jsonPath("$.cancerAntecedenteQuirurgico").value(DEFAULT_CANCER_ANTECEDENTE_QUIRURGICO.booleanValue()))
            .andExpect(jsonPath("$.pomeroy").value(DEFAULT_POMEROY.booleanValue()))
            .andExpect(jsonPath("$.otroAntecedenteQuirurgico").value(DEFAULT_OTRO_ANTECEDENTE_QUIRURGICO.booleanValue()))
            .andExpect(jsonPath("$.descripcionOtroAntecedenteQuirurgico").value(DEFAULT_DESCRIPCION_OTRO_ANTECEDENTE_QUIRURGICO.toString()))
            .andExpect(jsonPath("$.fUR").value(DEFAULT_F_UR.toString()))
            .andExpect(jsonPath("$.formulaObstretica").value(DEFAULT_FORMULA_OBSTRETICA.booleanValue()))
            .andExpect(jsonPath("$.g").value(DEFAULT_G))
            .andExpect(jsonPath("$.p").value(DEFAULT_P))
            .andExpect(jsonPath("$.c").value(DEFAULT_C))
            .andExpect(jsonPath("$.a").value(DEFAULT_A))
            .andExpect(jsonPath("$.v").value(DEFAULT_V))
            .andExpect(jsonPath("$.planificacionFamiliar").value(DEFAULT_PLANIFICACION_FAMILIAR.toString()))
            .andExpect(jsonPath("$.fechaUltimaCitologia").value(DEFAULT_FECHA_ULTIMA_CITOLOGIA.toString()))
            .andExpect(jsonPath("$.ultimoParto").value(DEFAULT_ULTIMO_PARTO.toString()))
            .andExpect(jsonPath("$.mamografia").value(DEFAULT_MAMOGRAFIA.booleanValue()))
            .andExpect(jsonPath("$.medicamentosAntecedentes").value(DEFAULT_MEDICAMENTOS_ANTECEDENTES.toString()))
            .andExpect(jsonPath("$.esquemaVacunacion").value(DEFAULT_ESQUEMA_VACUNACION.toString()))
            .andExpect(jsonPath("$.fuma").value(DEFAULT_FUMA.booleanValue()))
            .andExpect(jsonPath("$.alcohol").value(DEFAULT_ALCOHOL.booleanValue()))
            .andExpect(jsonPath("$.sustanciasPsicoactivas").value(DEFAULT_SUSTANCIAS_PSICOACTIVAS.booleanValue()))
            .andExpect(jsonPath("$.revisionPorSistemas").value(DEFAULT_REVISION_POR_SISTEMAS.toString()))
            .andExpect(jsonPath("$.peso").value(DEFAULT_PESO.intValue()))
            .andExpect(jsonPath("$.talla").value(DEFAULT_TALLA.intValue()))
            .andExpect(jsonPath("$.iMC").value(DEFAULT_I_MC.intValue()))
            .andExpect(jsonPath("$.fC").value(DEFAULT_F_C))
            .andExpect(jsonPath("$.fR").value(DEFAULT_F_R))
            .andExpect(jsonPath("$.temperatura").value(DEFAULT_TEMPERATURA.intValue()))
            .andExpect(jsonPath("$.saturacion").value(DEFAULT_SATURACION))
            .andExpect(jsonPath("$.hemoglobina").value(DEFAULT_HEMOGLOBINA.intValue()))
            .andExpect(jsonPath("$.glucometria").value(DEFAULT_GLUCOMETRIA))
            .andExpect(jsonPath("$.circunferenciaBrazo").value(DEFAULT_CIRCUNFERENCIA_BRAZO.intValue()))
            .andExpect(jsonPath("$.circunferenciaAbdominal").value(DEFAULT_CIRCUNFERENCIA_ABDOMINAL.intValue()))
            .andExpect(jsonPath("$.hallazgosExamenFisico").value(DEFAULT_HALLAZGOS_EXAMEN_FISICO.toString()))
            .andExpect(jsonPath("$.valoracionNutricional").value(DEFAULT_VALORACION_NUTRICIONAL.toString()))
            .andExpect(jsonPath("$.diagnosticoPrincipal").value(DEFAULT_DIAGNOSTICO_PRINCIPAL.toString()))
            .andExpect(jsonPath("$.diagnosticoSecundario").value(DEFAULT_DIAGNOSTICO_SECUNDARIO.toString()))
            .andExpect(jsonPath("$.observacionesTratamiento").value(DEFAULT_OBSERVACIONES_TRATAMIENTO.toString()))
            .andExpect(jsonPath("$.recomendaciones").value(DEFAULT_RECOMENDACIONES.toString()))
            .andExpect(jsonPath("$.destino").value(DEFAULT_DESTINO.toString()))
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
            .motivoConsulta(UPDATED_MOTIVO_CONSULTA)
            .enfermedadActual(UPDATED_ENFERMEDAD_ACTUAL)
            .hipertensionArterial(UPDATED_HIPERTENSION_ARTERIAL)
            .diabetesMellitus(UPDATED_DIABETES_MELLITUS)
            .cancerAntecedentePatologico(UPDATED_CANCER_ANTECEDENTE_PATOLOGICO)
            .tuberculosis(UPDATED_TUBERCULOSIS)
            .insuficienciaRenal(UPDATED_INSUFICIENCIA_RENAL)
            .vIHSida(UPDATED_V_IH_SIDA)
            .otroAntecedentePatologico(UPDATED_OTRO_ANTECEDENTE_PATOLOGICO)
            .descripcionOtroAntecedentePatologico(UPDATED_DESCRIPCION_OTRO_ANTECEDENTE_PATOLOGICO)
            .cancerAntecedenteQuirurgico(UPDATED_CANCER_ANTECEDENTE_QUIRURGICO)
            .pomeroy(UPDATED_POMEROY)
            .otroAntecedenteQuirurgico(UPDATED_OTRO_ANTECEDENTE_QUIRURGICO)
            .descripcionOtroAntecedenteQuirurgico(UPDATED_DESCRIPCION_OTRO_ANTECEDENTE_QUIRURGICO)
            .fUR(UPDATED_F_UR)
            .formulaObstretica(UPDATED_FORMULA_OBSTRETICA)
            .g(UPDATED_G)
            .p(UPDATED_P)
            .c(UPDATED_C)
            .a(UPDATED_A)
            .v(UPDATED_V)
            .planificacionFamiliar(UPDATED_PLANIFICACION_FAMILIAR)
            .fechaUltimaCitologia(UPDATED_FECHA_ULTIMA_CITOLOGIA)
            .ultimoParto(UPDATED_ULTIMO_PARTO)
            .mamografia(UPDATED_MAMOGRAFIA)
            .medicamentosAntecedentes(UPDATED_MEDICAMENTOS_ANTECEDENTES)
            .esquemaVacunacion(UPDATED_ESQUEMA_VACUNACION)
            .fuma(UPDATED_FUMA)
            .alcohol(UPDATED_ALCOHOL)
            .sustanciasPsicoactivas(UPDATED_SUSTANCIAS_PSICOACTIVAS)
            .revisionPorSistemas(UPDATED_REVISION_POR_SISTEMAS)
            .peso(UPDATED_PESO)
            .talla(UPDATED_TALLA)
            .iMC(UPDATED_I_MC)
            .fC(UPDATED_F_C)
            .fR(UPDATED_F_R)
            .temperatura(UPDATED_TEMPERATURA)
            .saturacion(UPDATED_SATURACION)
            .hemoglobina(UPDATED_HEMOGLOBINA)
            .glucometria(UPDATED_GLUCOMETRIA)
            .circunferenciaBrazo(UPDATED_CIRCUNFERENCIA_BRAZO)
            .circunferenciaAbdominal(UPDATED_CIRCUNFERENCIA_ABDOMINAL)
            .hallazgosExamenFisico(UPDATED_HALLAZGOS_EXAMEN_FISICO)
            .valoracionNutricional(UPDATED_VALORACION_NUTRICIONAL)
            .diagnosticoPrincipal(UPDATED_DIAGNOSTICO_PRINCIPAL)
            .diagnosticoSecundario(UPDATED_DIAGNOSTICO_SECUNDARIO)
            .observacionesTratamiento(UPDATED_OBSERVACIONES_TRATAMIENTO)
            .recomendaciones(UPDATED_RECOMENDACIONES)
            .destino(UPDATED_DESTINO)
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
        assertThat(testAtencion.getMotivoConsulta()).isEqualTo(UPDATED_MOTIVO_CONSULTA);
        assertThat(testAtencion.getEnfermedadActual()).isEqualTo(UPDATED_ENFERMEDAD_ACTUAL);
        assertThat(testAtencion.isHipertensionArterial()).isEqualTo(UPDATED_HIPERTENSION_ARTERIAL);
        assertThat(testAtencion.isDiabetesMellitus()).isEqualTo(UPDATED_DIABETES_MELLITUS);
        assertThat(testAtencion.isCancerAntecedentePatologico()).isEqualTo(UPDATED_CANCER_ANTECEDENTE_PATOLOGICO);
        assertThat(testAtencion.isTuberculosis()).isEqualTo(UPDATED_TUBERCULOSIS);
        assertThat(testAtencion.isInsuficienciaRenal()).isEqualTo(UPDATED_INSUFICIENCIA_RENAL);
        assertThat(testAtencion.isvIHSida()).isEqualTo(UPDATED_V_IH_SIDA);
        assertThat(testAtencion.isOtroAntecedentePatologico()).isEqualTo(UPDATED_OTRO_ANTECEDENTE_PATOLOGICO);
        assertThat(testAtencion.getDescripcionOtroAntecedentePatologico()).isEqualTo(UPDATED_DESCRIPCION_OTRO_ANTECEDENTE_PATOLOGICO);
        assertThat(testAtencion.isCancerAntecedenteQuirurgico()).isEqualTo(UPDATED_CANCER_ANTECEDENTE_QUIRURGICO);
        assertThat(testAtencion.isPomeroy()).isEqualTo(UPDATED_POMEROY);
        assertThat(testAtencion.isOtroAntecedenteQuirurgico()).isEqualTo(UPDATED_OTRO_ANTECEDENTE_QUIRURGICO);
        assertThat(testAtencion.getDescripcionOtroAntecedenteQuirurgico()).isEqualTo(UPDATED_DESCRIPCION_OTRO_ANTECEDENTE_QUIRURGICO);
        assertThat(testAtencion.getfUR()).isEqualTo(UPDATED_F_UR);
        assertThat(testAtencion.isFormulaObstretica()).isEqualTo(UPDATED_FORMULA_OBSTRETICA);
        assertThat(testAtencion.getG()).isEqualTo(UPDATED_G);
        assertThat(testAtencion.getP()).isEqualTo(UPDATED_P);
        assertThat(testAtencion.getC()).isEqualTo(UPDATED_C);
        assertThat(testAtencion.getA()).isEqualTo(UPDATED_A);
        assertThat(testAtencion.getV()).isEqualTo(UPDATED_V);
        assertThat(testAtencion.getPlanificacionFamiliar()).isEqualTo(UPDATED_PLANIFICACION_FAMILIAR);
        assertThat(testAtencion.getFechaUltimaCitologia()).isEqualTo(UPDATED_FECHA_ULTIMA_CITOLOGIA);
        assertThat(testAtencion.getUltimoParto()).isEqualTo(UPDATED_ULTIMO_PARTO);
        assertThat(testAtencion.isMamografia()).isEqualTo(UPDATED_MAMOGRAFIA);
        assertThat(testAtencion.getMedicamentosAntecedentes()).isEqualTo(UPDATED_MEDICAMENTOS_ANTECEDENTES);
        assertThat(testAtencion.getEsquemaVacunacion()).isEqualTo(UPDATED_ESQUEMA_VACUNACION);
        assertThat(testAtencion.isFuma()).isEqualTo(UPDATED_FUMA);
        assertThat(testAtencion.isAlcohol()).isEqualTo(UPDATED_ALCOHOL);
        assertThat(testAtencion.isSustanciasPsicoactivas()).isEqualTo(UPDATED_SUSTANCIAS_PSICOACTIVAS);
        assertThat(testAtencion.getRevisionPorSistemas()).isEqualTo(UPDATED_REVISION_POR_SISTEMAS);
        assertThat(testAtencion.getPeso()).isEqualTo(UPDATED_PESO);
        assertThat(testAtencion.getTalla()).isEqualTo(UPDATED_TALLA);
        assertThat(testAtencion.getiMC()).isEqualTo(UPDATED_I_MC);
        assertThat(testAtencion.getfC()).isEqualTo(UPDATED_F_C);
        assertThat(testAtencion.getfR()).isEqualTo(UPDATED_F_R);
        assertThat(testAtencion.getTemperatura()).isEqualTo(UPDATED_TEMPERATURA);
        assertThat(testAtencion.getSaturacion()).isEqualTo(UPDATED_SATURACION);
        assertThat(testAtencion.getHemoglobina()).isEqualTo(UPDATED_HEMOGLOBINA);
        assertThat(testAtencion.getGlucometria()).isEqualTo(UPDATED_GLUCOMETRIA);
        assertThat(testAtencion.getCircunferenciaBrazo()).isEqualTo(UPDATED_CIRCUNFERENCIA_BRAZO);
        assertThat(testAtencion.getCircunferenciaAbdominal()).isEqualTo(UPDATED_CIRCUNFERENCIA_ABDOMINAL);
        assertThat(testAtencion.getHallazgosExamenFisico()).isEqualTo(UPDATED_HALLAZGOS_EXAMEN_FISICO);
        assertThat(testAtencion.getValoracionNutricional()).isEqualTo(UPDATED_VALORACION_NUTRICIONAL);
        assertThat(testAtencion.getDiagnosticoPrincipal()).isEqualTo(UPDATED_DIAGNOSTICO_PRINCIPAL);
        assertThat(testAtencion.getDiagnosticoSecundario()).isEqualTo(UPDATED_DIAGNOSTICO_SECUNDARIO);
        assertThat(testAtencion.getObservacionesTratamiento()).isEqualTo(UPDATED_OBSERVACIONES_TRATAMIENTO);
        assertThat(testAtencion.getRecomendaciones()).isEqualTo(UPDATED_RECOMENDACIONES);
        assertThat(testAtencion.getDestino()).isEqualTo(UPDATED_DESTINO);
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
