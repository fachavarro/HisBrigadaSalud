package com.osi.hisbrigadasalud.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Atencion.
 */
@Document(collection = "atencion")
public class Atencion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("fecha")
    private Instant fecha;

    @NotNull
    @Field("especialidad")
    private String especialidad;

    @Size(max = 20)
    @Field("otra_especialidad")
    private String otraEspecialidad;

    @Size(max = 1000)
    @Field("motivo_consulta")
    private String motivoConsulta;

    @Size(max = 4000)
    @Field("enfermedad_actual")
    private String enfermedadActual;

    @Field("hipertension_arterial")
    private Boolean hipertensionArterial;

    @Field("diabetes_mellitus")
    private Boolean diabetesMellitus;

    @Field("cancer_antecedente_patologico")
    private Boolean cancerAntecedentePatologico;

    @Field("tuberculosis")
    private Boolean tuberculosis;

    @Field("insuficiencia_renal")
    private Boolean insuficienciaRenal;

    @Field("v_ih_sida")
    private Boolean vIHSida;

    @Field("otro_antecedente_patologico")
    private Boolean otroAntecedentePatologico;

    @Size(max = 500)
    @Field("descripcion_otro_antecedente_patologico")
    private String descripcionOtroAntecedentePatologico;

    @Field("cancer_antecedente_quirurgico")
    private Boolean cancerAntecedenteQuirurgico;

    @Field("pomeroy")
    private Boolean pomeroy;

    @Field("otro_antecedente_quirurgico")
    private Boolean otroAntecedenteQuirurgico;

    @Size(max = 500)
    @Field("descripcion_otro_antecedente_quirurgico")
    private String descripcionOtroAntecedenteQuirurgico;

    @Field("f_ur")
    private LocalDate fUR;

    @Field("formula_obstretica")
    private Boolean formulaObstretica;

    @Field("g")
    private Integer g;

    @Field("p")
    private Integer p;

    @Field("c")
    private Integer c;

    @Field("a")
    private Integer a;

    @Field("v")
    private Integer v;

    @Size(max = 100)
    @Field("planificacion_familiar")
    private String planificacionFamiliar;

    @Field("fecha_ultima_citologia")
    private String fechaUltimaCitologia;

    @Field("ultimo_parto")
    private LocalDate ultimoParto;

    @Field("mamografia")
    private Boolean mamografia;

    @Size(max = 1000)
    @Field("medicamentos_antecedentes")
    private String medicamentosAntecedentes;

    @Field("esquema_vacunacion")
    private String esquemaVacunacion;

    @Field("fuma")
    private Boolean fuma;

    @Field("alcohol")
    private Boolean alcohol;

    @Field("sustancias_psicoactivas")
    private Boolean sustanciasPsicoactivas;

    @Size(max = 1000)
    @Field("revision_por_sistemas")
    private String revisionPorSistemas;

    @Field("peso")
    private BigDecimal peso;

    @Field("talla")
    private BigDecimal talla;

    @Field("i_mc")
    private BigDecimal iMC;

    @Field("f_c")
    private Integer fC;

    @Field("f_r")
    private Integer fR;

    @Field("temperatura")
    private BigDecimal temperatura;

    @Field("saturacion")
    private Integer saturacion;

    @Field("hemoglobina")
    private BigDecimal hemoglobina;

    @Field("glucometria")
    private Integer glucometria;

    @Field("circunferencia_brazo")
    private BigDecimal circunferenciaBrazo;

    @Field("circunferencia_abdominal")
    private BigDecimal circunferenciaAbdominal;

    @Size(max = 4000)
    @Field("hallazgos_examen_fisico")
    private String hallazgosExamenFisico;

    @Size(max = 4000)
    @Field("valoracion_nutricional")
    private String valoracionNutricional;

    @Field("diagnostico_principal")
    private String diagnosticoPrincipal;

    @Field("diagnostico_secundario")
    private String diagnosticoSecundario;

    @Size(max = 1000)
    @Field("observaciones_tratamiento")
    private String observacionesTratamiento;

    @Size(max = 2000)
    @Field("recomendaciones")
    private String recomendaciones;

    @Field("destino")
    private String destino;

    @Field("created_at")
    private Instant createdAt;

    @Field("updated_at")
    private Instant updatedAt;

    @DBRef
    @Field("brigada")
    private Brigada brigada;

    @DBRef
    @Field("paciente")
    private Paciente paciente;

    @DBRef
    @Field("usuario")
    private Usuario usuario;

    @DBRef
    @Field("medicamentos")
    private Set<Medicamento> medicamentos = new HashSet<>();

    @DBRef
    @Field("procedimientos")
    private Set<Procedimiento> procedimientos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Instant getFecha() {
        return fecha;
    }

    public Atencion fecha(Instant fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public String getEspecialidad() {
        return especialidad;
    }

    public Atencion especialidad(String especialidad) {
        this.especialidad = especialidad;
        return this;
    }

    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }

    public String getOtraEspecialidad() {
        return otraEspecialidad;
    }

    public Atencion otraEspecialidad(String otraEspecialidad) {
        this.otraEspecialidad = otraEspecialidad;
        return this;
    }

    public void setOtraEspecialidad(String otraEspecialidad) {
        this.otraEspecialidad = otraEspecialidad;
    }

    public String getMotivoConsulta() {
        return motivoConsulta;
    }

    public Atencion motivoConsulta(String motivoConsulta) {
        this.motivoConsulta = motivoConsulta;
        return this;
    }

    public void setMotivoConsulta(String motivoConsulta) {
        this.motivoConsulta = motivoConsulta;
    }

    public String getEnfermedadActual() {
        return enfermedadActual;
    }

    public Atencion enfermedadActual(String enfermedadActual) {
        this.enfermedadActual = enfermedadActual;
        return this;
    }

    public void setEnfermedadActual(String enfermedadActual) {
        this.enfermedadActual = enfermedadActual;
    }

    public Boolean isHipertensionArterial() {
        return hipertensionArterial;
    }

    public Atencion hipertensionArterial(Boolean hipertensionArterial) {
        this.hipertensionArterial = hipertensionArterial;
        return this;
    }

    public void setHipertensionArterial(Boolean hipertensionArterial) {
        this.hipertensionArterial = hipertensionArterial;
    }

    public Boolean isDiabetesMellitus() {
        return diabetesMellitus;
    }

    public Atencion diabetesMellitus(Boolean diabetesMellitus) {
        this.diabetesMellitus = diabetesMellitus;
        return this;
    }

    public void setDiabetesMellitus(Boolean diabetesMellitus) {
        this.diabetesMellitus = diabetesMellitus;
    }

    public Boolean isCancerAntecedentePatologico() {
        return cancerAntecedentePatologico;
    }

    public Atencion cancerAntecedentePatologico(Boolean cancerAntecedentePatologico) {
        this.cancerAntecedentePatologico = cancerAntecedentePatologico;
        return this;
    }

    public void setCancerAntecedentePatologico(Boolean cancerAntecedentePatologico) {
        this.cancerAntecedentePatologico = cancerAntecedentePatologico;
    }

    public Boolean isTuberculosis() {
        return tuberculosis;
    }

    public Atencion tuberculosis(Boolean tuberculosis) {
        this.tuberculosis = tuberculosis;
        return this;
    }

    public void setTuberculosis(Boolean tuberculosis) {
        this.tuberculosis = tuberculosis;
    }

    public Boolean isInsuficienciaRenal() {
        return insuficienciaRenal;
    }

    public Atencion insuficienciaRenal(Boolean insuficienciaRenal) {
        this.insuficienciaRenal = insuficienciaRenal;
        return this;
    }

    public void setInsuficienciaRenal(Boolean insuficienciaRenal) {
        this.insuficienciaRenal = insuficienciaRenal;
    }

    public Boolean isvIHSida() {
        return vIHSida;
    }

    public Atencion vIHSida(Boolean vIHSida) {
        this.vIHSida = vIHSida;
        return this;
    }

    public void setvIHSida(Boolean vIHSida) {
        this.vIHSida = vIHSida;
    }

    public Boolean isOtroAntecedentePatologico() {
        return otroAntecedentePatologico;
    }

    public Atencion otroAntecedentePatologico(Boolean otroAntecedentePatologico) {
        this.otroAntecedentePatologico = otroAntecedentePatologico;
        return this;
    }

    public void setOtroAntecedentePatologico(Boolean otroAntecedentePatologico) {
        this.otroAntecedentePatologico = otroAntecedentePatologico;
    }

    public String getDescripcionOtroAntecedentePatologico() {
        return descripcionOtroAntecedentePatologico;
    }

    public Atencion descripcionOtroAntecedentePatologico(String descripcionOtroAntecedentePatologico) {
        this.descripcionOtroAntecedentePatologico = descripcionOtroAntecedentePatologico;
        return this;
    }

    public void setDescripcionOtroAntecedentePatologico(String descripcionOtroAntecedentePatologico) {
        this.descripcionOtroAntecedentePatologico = descripcionOtroAntecedentePatologico;
    }

    public Boolean isCancerAntecedenteQuirurgico() {
        return cancerAntecedenteQuirurgico;
    }

    public Atencion cancerAntecedenteQuirurgico(Boolean cancerAntecedenteQuirurgico) {
        this.cancerAntecedenteQuirurgico = cancerAntecedenteQuirurgico;
        return this;
    }

    public void setCancerAntecedenteQuirurgico(Boolean cancerAntecedenteQuirurgico) {
        this.cancerAntecedenteQuirurgico = cancerAntecedenteQuirurgico;
    }

    public Boolean isPomeroy() {
        return pomeroy;
    }

    public Atencion pomeroy(Boolean pomeroy) {
        this.pomeroy = pomeroy;
        return this;
    }

    public void setPomeroy(Boolean pomeroy) {
        this.pomeroy = pomeroy;
    }

    public Boolean isOtroAntecedenteQuirurgico() {
        return otroAntecedenteQuirurgico;
    }

    public Atencion otroAntecedenteQuirurgico(Boolean otroAntecedenteQuirurgico) {
        this.otroAntecedenteQuirurgico = otroAntecedenteQuirurgico;
        return this;
    }

    public void setOtroAntecedenteQuirurgico(Boolean otroAntecedenteQuirurgico) {
        this.otroAntecedenteQuirurgico = otroAntecedenteQuirurgico;
    }

    public String getDescripcionOtroAntecedenteQuirurgico() {
        return descripcionOtroAntecedenteQuirurgico;
    }

    public Atencion descripcionOtroAntecedenteQuirurgico(String descripcionOtroAntecedenteQuirurgico) {
        this.descripcionOtroAntecedenteQuirurgico = descripcionOtroAntecedenteQuirurgico;
        return this;
    }

    public void setDescripcionOtroAntecedenteQuirurgico(String descripcionOtroAntecedenteQuirurgico) {
        this.descripcionOtroAntecedenteQuirurgico = descripcionOtroAntecedenteQuirurgico;
    }

    public LocalDate getfUR() {
        return fUR;
    }

    public Atencion fUR(LocalDate fUR) {
        this.fUR = fUR;
        return this;
    }

    public void setfUR(LocalDate fUR) {
        this.fUR = fUR;
    }

    public Boolean isFormulaObstretica() {
        return formulaObstretica;
    }

    public Atencion formulaObstretica(Boolean formulaObstretica) {
        this.formulaObstretica = formulaObstretica;
        return this;
    }

    public void setFormulaObstretica(Boolean formulaObstretica) {
        this.formulaObstretica = formulaObstretica;
    }

    public Integer getG() {
        return g;
    }

    public Atencion g(Integer g) {
        this.g = g;
        return this;
    }

    public void setG(Integer g) {
        this.g = g;
    }

    public Integer getP() {
        return p;
    }

    public Atencion p(Integer p) {
        this.p = p;
        return this;
    }

    public void setP(Integer p) {
        this.p = p;
    }

    public Integer getC() {
        return c;
    }

    public Atencion c(Integer c) {
        this.c = c;
        return this;
    }

    public void setC(Integer c) {
        this.c = c;
    }

    public Integer getA() {
        return a;
    }

    public Atencion a(Integer a) {
        this.a = a;
        return this;
    }

    public void setA(Integer a) {
        this.a = a;
    }

    public Integer getV() {
        return v;
    }

    public Atencion v(Integer v) {
        this.v = v;
        return this;
    }

    public void setV(Integer v) {
        this.v = v;
    }

    public String getPlanificacionFamiliar() {
        return planificacionFamiliar;
    }

    public Atencion planificacionFamiliar(String planificacionFamiliar) {
        this.planificacionFamiliar = planificacionFamiliar;
        return this;
    }

    public void setPlanificacionFamiliar(String planificacionFamiliar) {
        this.planificacionFamiliar = planificacionFamiliar;
    }

    public String getFechaUltimaCitologia() {
        return fechaUltimaCitologia;
    }

    public Atencion fechaUltimaCitologia(String fechaUltimaCitologia) {
        this.fechaUltimaCitologia = fechaUltimaCitologia;
        return this;
    }

    public void setFechaUltimaCitologia(String fechaUltimaCitologia) {
        this.fechaUltimaCitologia = fechaUltimaCitologia;
    }

    public LocalDate getUltimoParto() {
        return ultimoParto;
    }

    public Atencion ultimoParto(LocalDate ultimoParto) {
        this.ultimoParto = ultimoParto;
        return this;
    }

    public void setUltimoParto(LocalDate ultimoParto) {
        this.ultimoParto = ultimoParto;
    }

    public Boolean isMamografia() {
        return mamografia;
    }

    public Atencion mamografia(Boolean mamografia) {
        this.mamografia = mamografia;
        return this;
    }

    public void setMamografia(Boolean mamografia) {
        this.mamografia = mamografia;
    }

    public String getMedicamentosAntecedentes() {
        return medicamentosAntecedentes;
    }

    public Atencion medicamentosAntecedentes(String medicamentosAntecedentes) {
        this.medicamentosAntecedentes = medicamentosAntecedentes;
        return this;
    }

    public void setMedicamentosAntecedentes(String medicamentosAntecedentes) {
        this.medicamentosAntecedentes = medicamentosAntecedentes;
    }

    public String getEsquemaVacunacion() {
        return esquemaVacunacion;
    }

    public Atencion esquemaVacunacion(String esquemaVacunacion) {
        this.esquemaVacunacion = esquemaVacunacion;
        return this;
    }

    public void setEsquemaVacunacion(String esquemaVacunacion) {
        this.esquemaVacunacion = esquemaVacunacion;
    }

    public Boolean isFuma() {
        return fuma;
    }

    public Atencion fuma(Boolean fuma) {
        this.fuma = fuma;
        return this;
    }

    public void setFuma(Boolean fuma) {
        this.fuma = fuma;
    }

    public Boolean isAlcohol() {
        return alcohol;
    }

    public Atencion alcohol(Boolean alcohol) {
        this.alcohol = alcohol;
        return this;
    }

    public void setAlcohol(Boolean alcohol) {
        this.alcohol = alcohol;
    }

    public Boolean isSustanciasPsicoactivas() {
        return sustanciasPsicoactivas;
    }

    public Atencion sustanciasPsicoactivas(Boolean sustanciasPsicoactivas) {
        this.sustanciasPsicoactivas = sustanciasPsicoactivas;
        return this;
    }

    public void setSustanciasPsicoactivas(Boolean sustanciasPsicoactivas) {
        this.sustanciasPsicoactivas = sustanciasPsicoactivas;
    }

    public String getRevisionPorSistemas() {
        return revisionPorSistemas;
    }

    public Atencion revisionPorSistemas(String revisionPorSistemas) {
        this.revisionPorSistemas = revisionPorSistemas;
        return this;
    }

    public void setRevisionPorSistemas(String revisionPorSistemas) {
        this.revisionPorSistemas = revisionPorSistemas;
    }

    public BigDecimal getPeso() {
        return peso;
    }

    public Atencion peso(BigDecimal peso) {
        this.peso = peso;
        return this;
    }

    public void setPeso(BigDecimal peso) {
        this.peso = peso;
    }

    public BigDecimal getTalla() {
        return talla;
    }

    public Atencion talla(BigDecimal talla) {
        this.talla = talla;
        return this;
    }

    public void setTalla(BigDecimal talla) {
        this.talla = talla;
    }

    public BigDecimal getiMC() {
        return iMC;
    }

    public Atencion iMC(BigDecimal iMC) {
        this.iMC = iMC;
        return this;
    }

    public void setiMC(BigDecimal iMC) {
        this.iMC = iMC;
    }

    public Integer getfC() {
        return fC;
    }

    public Atencion fC(Integer fC) {
        this.fC = fC;
        return this;
    }

    public void setfC(Integer fC) {
        this.fC = fC;
    }

    public Integer getfR() {
        return fR;
    }

    public Atencion fR(Integer fR) {
        this.fR = fR;
        return this;
    }

    public void setfR(Integer fR) {
        this.fR = fR;
    }

    public BigDecimal getTemperatura() {
        return temperatura;
    }

    public Atencion temperatura(BigDecimal temperatura) {
        this.temperatura = temperatura;
        return this;
    }

    public void setTemperatura(BigDecimal temperatura) {
        this.temperatura = temperatura;
    }

    public Integer getSaturacion() {
        return saturacion;
    }

    public Atencion saturacion(Integer saturacion) {
        this.saturacion = saturacion;
        return this;
    }

    public void setSaturacion(Integer saturacion) {
        this.saturacion = saturacion;
    }

    public BigDecimal getHemoglobina() {
        return hemoglobina;
    }

    public Atencion hemoglobina(BigDecimal hemoglobina) {
        this.hemoglobina = hemoglobina;
        return this;
    }

    public void setHemoglobina(BigDecimal hemoglobina) {
        this.hemoglobina = hemoglobina;
    }

    public Integer getGlucometria() {
        return glucometria;
    }

    public Atencion glucometria(Integer glucometria) {
        this.glucometria = glucometria;
        return this;
    }

    public void setGlucometria(Integer glucometria) {
        this.glucometria = glucometria;
    }

    public BigDecimal getCircunferenciaBrazo() {
        return circunferenciaBrazo;
    }

    public Atencion circunferenciaBrazo(BigDecimal circunferenciaBrazo) {
        this.circunferenciaBrazo = circunferenciaBrazo;
        return this;
    }

    public void setCircunferenciaBrazo(BigDecimal circunferenciaBrazo) {
        this.circunferenciaBrazo = circunferenciaBrazo;
    }

    public BigDecimal getCircunferenciaAbdominal() {
        return circunferenciaAbdominal;
    }

    public Atencion circunferenciaAbdominal(BigDecimal circunferenciaAbdominal) {
        this.circunferenciaAbdominal = circunferenciaAbdominal;
        return this;
    }

    public void setCircunferenciaAbdominal(BigDecimal circunferenciaAbdominal) {
        this.circunferenciaAbdominal = circunferenciaAbdominal;
    }

    public String getHallazgosExamenFisico() {
        return hallazgosExamenFisico;
    }

    public Atencion hallazgosExamenFisico(String hallazgosExamenFisico) {
        this.hallazgosExamenFisico = hallazgosExamenFisico;
        return this;
    }

    public void setHallazgosExamenFisico(String hallazgosExamenFisico) {
        this.hallazgosExamenFisico = hallazgosExamenFisico;
    }

    public String getValoracionNutricional() {
        return valoracionNutricional;
    }

    public Atencion valoracionNutricional(String valoracionNutricional) {
        this.valoracionNutricional = valoracionNutricional;
        return this;
    }

    public void setValoracionNutricional(String valoracionNutricional) {
        this.valoracionNutricional = valoracionNutricional;
    }

    public String getDiagnosticoPrincipal() {
        return diagnosticoPrincipal;
    }

    public Atencion diagnosticoPrincipal(String diagnosticoPrincipal) {
        this.diagnosticoPrincipal = diagnosticoPrincipal;
        return this;
    }

    public void setDiagnosticoPrincipal(String diagnosticoPrincipal) {
        this.diagnosticoPrincipal = diagnosticoPrincipal;
    }

    public String getDiagnosticoSecundario() {
        return diagnosticoSecundario;
    }

    public Atencion diagnosticoSecundario(String diagnosticoSecundario) {
        this.diagnosticoSecundario = diagnosticoSecundario;
        return this;
    }

    public void setDiagnosticoSecundario(String diagnosticoSecundario) {
        this.diagnosticoSecundario = diagnosticoSecundario;
    }

    public String getObservacionesTratamiento() {
        return observacionesTratamiento;
    }

    public Atencion observacionesTratamiento(String observacionesTratamiento) {
        this.observacionesTratamiento = observacionesTratamiento;
        return this;
    }

    public void setObservacionesTratamiento(String observacionesTratamiento) {
        this.observacionesTratamiento = observacionesTratamiento;
    }

    public String getRecomendaciones() {
        return recomendaciones;
    }

    public Atencion recomendaciones(String recomendaciones) {
        this.recomendaciones = recomendaciones;
        return this;
    }

    public void setRecomendaciones(String recomendaciones) {
        this.recomendaciones = recomendaciones;
    }

    public String getDestino() {
        return destino;
    }

    public Atencion destino(String destino) {
        this.destino = destino;
        return this;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Atencion createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public Atencion updatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Brigada getBrigada() {
        return brigada;
    }

    public Atencion brigada(Brigada brigada) {
        this.brigada = brigada;
        return this;
    }

    public void setBrigada(Brigada brigada) {
        this.brigada = brigada;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public Atencion paciente(Paciente paciente) {
        this.paciente = paciente;
        return this;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Atencion usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Set<Medicamento> getMedicamentos() {
        return medicamentos;
    }

    public Atencion medicamentos(Set<Medicamento> medicamentos) {
        this.medicamentos = medicamentos;
        return this;
    }

    public Atencion addMedicamentos(Medicamento medicamento) {
        this.medicamentos.add(medicamento);
        medicamento.getAtencions().add(this);
        return this;
    }

    public Atencion removeMedicamentos(Medicamento medicamento) {
        this.medicamentos.remove(medicamento);
        medicamento.getAtencions().remove(this);
        return this;
    }

    public void setMedicamentos(Set<Medicamento> medicamentos) {
        this.medicamentos = medicamentos;
    }

    public Set<Procedimiento> getProcedimientos() {
        return procedimientos;
    }

    public Atencion procedimientos(Set<Procedimiento> procedimientos) {
        this.procedimientos = procedimientos;
        return this;
    }

    public Atencion addProcedimientos(Procedimiento procedimiento) {
        this.procedimientos.add(procedimiento);
        procedimiento.getAtencions().add(this);
        return this;
    }

    public Atencion removeProcedimientos(Procedimiento procedimiento) {
        this.procedimientos.remove(procedimiento);
        procedimiento.getAtencions().remove(this);
        return this;
    }

    public void setProcedimientos(Set<Procedimiento> procedimientos) {
        this.procedimientos = procedimientos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Atencion)) {
            return false;
        }
        return id != null && id.equals(((Atencion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Atencion{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", especialidad='" + getEspecialidad() + "'" +
            ", otraEspecialidad='" + getOtraEspecialidad() + "'" +
            ", motivoConsulta='" + getMotivoConsulta() + "'" +
            ", enfermedadActual='" + getEnfermedadActual() + "'" +
            ", hipertensionArterial='" + isHipertensionArterial() + "'" +
            ", diabetesMellitus='" + isDiabetesMellitus() + "'" +
            ", cancerAntecedentePatologico='" + isCancerAntecedentePatologico() + "'" +
            ", tuberculosis='" + isTuberculosis() + "'" +
            ", insuficienciaRenal='" + isInsuficienciaRenal() + "'" +
            ", vIHSida='" + isvIHSida() + "'" +
            ", otroAntecedentePatologico='" + isOtroAntecedentePatologico() + "'" +
            ", descripcionOtroAntecedentePatologico='" + getDescripcionOtroAntecedentePatologico() + "'" +
            ", cancerAntecedenteQuirurgico='" + isCancerAntecedenteQuirurgico() + "'" +
            ", pomeroy='" + isPomeroy() + "'" +
            ", otroAntecedenteQuirurgico='" + isOtroAntecedenteQuirurgico() + "'" +
            ", descripcionOtroAntecedenteQuirurgico='" + getDescripcionOtroAntecedenteQuirurgico() + "'" +
            ", fUR='" + getfUR() + "'" +
            ", formulaObstretica='" + isFormulaObstretica() + "'" +
            ", g=" + getG() +
            ", p=" + getP() +
            ", c=" + getC() +
            ", a=" + getA() +
            ", v=" + getV() +
            ", planificacionFamiliar='" + getPlanificacionFamiliar() + "'" +
            ", fechaUltimaCitologia='" + getFechaUltimaCitologia() + "'" +
            ", ultimoParto='" + getUltimoParto() + "'" +
            ", mamografia='" + isMamografia() + "'" +
            ", medicamentosAntecedentes='" + getMedicamentosAntecedentes() + "'" +
            ", esquemaVacunacion='" + getEsquemaVacunacion() + "'" +
            ", fuma='" + isFuma() + "'" +
            ", alcohol='" + isAlcohol() + "'" +
            ", sustanciasPsicoactivas='" + isSustanciasPsicoactivas() + "'" +
            ", revisionPorSistemas='" + getRevisionPorSistemas() + "'" +
            ", peso=" + getPeso() +
            ", talla=" + getTalla() +
            ", iMC=" + getiMC() +
            ", fC=" + getfC() +
            ", fR=" + getfR() +
            ", temperatura=" + getTemperatura() +
            ", saturacion=" + getSaturacion() +
            ", hemoglobina=" + getHemoglobina() +
            ", glucometria=" + getGlucometria() +
            ", circunferenciaBrazo=" + getCircunferenciaBrazo() +
            ", circunferenciaAbdominal=" + getCircunferenciaAbdominal() +
            ", hallazgosExamenFisico='" + getHallazgosExamenFisico() + "'" +
            ", valoracionNutricional='" + getValoracionNutricional() + "'" +
            ", diagnosticoPrincipal='" + getDiagnosticoPrincipal() + "'" +
            ", diagnosticoSecundario='" + getDiagnosticoSecundario() + "'" +
            ", observacionesTratamiento='" + getObservacionesTratamiento() + "'" +
            ", recomendaciones='" + getRecomendaciones() + "'" +
            ", destino='" + getDestino() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
