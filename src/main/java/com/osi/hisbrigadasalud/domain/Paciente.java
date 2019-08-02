package com.osi.hisbrigadasalud.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;

/**
 * A Paciente.
 */
@Document(collection = "paciente")
public class Paciente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("tipo_doc")
    private String tipoDoc;

    @NotNull
    @Size(max = 50)
    @Field("numero_documento")
    private String numeroDocumento;

    @NotNull
    @Size(max = 50)
    @Field("nombre")
    private String nombre;

    @NotNull
    @Size(max = 50)
    @Field("apellido")
    private String apellido;

    @NotNull
    @Field("genero")
    private String genero;

    @NotNull
    @Field("fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @Field("acudiente")
    private String acudiente;

    @Size(max = 50)
    @Field("ocupacion")
    private String ocupacion;

    @Field("afiliado_sss")
    private Boolean afiliadoSSS;

    @Size(max = 50)
    @Field("cual_sss")
    private String cualSSS;

    @NotNull
    @Size(max = 50)
    @Field("nacionalidad")
    private String nacionalidad;

    @Size(max = 50)
    @Field("barrio_vive")
    private String barrioVive;

    @Size(max = 10)
    @Field("numero_telefono")
    private String numeroTelefono;

    @Field("created_at")
    private Instant createdAt;

    @Field("updated_at")
    private Instant updatedAt;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTipoDoc() {
        return tipoDoc;
    }

    public Paciente tipoDoc(String tipoDoc) {
        this.tipoDoc = tipoDoc;
        return this;
    }

    public void setTipoDoc(String tipoDoc) {
        this.tipoDoc = tipoDoc;
    }

    public String getNumeroDocumento() {
        return numeroDocumento;
    }

    public Paciente numeroDocumento(String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
        return this;
    }

    public void setNumeroDocumento(String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
    }

    public String getNombre() {
        return nombre;
    }

    public Paciente nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public Paciente apellido(String apellido) {
        this.apellido = apellido;
        return this;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getGenero() {
        return genero;
    }

    public Paciente genero(String genero) {
        this.genero = genero;
        return this;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public Paciente fechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
        return this;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getAcudiente() {
        return acudiente;
    }

    public Paciente acudiente(String acudiente) {
        this.acudiente = acudiente;
        return this;
    }

    public void setAcudiente(String acudiente) {
        this.acudiente = acudiente;
    }

    public String getOcupacion() {
        return ocupacion;
    }

    public Paciente ocupacion(String ocupacion) {
        this.ocupacion = ocupacion;
        return this;
    }

    public void setOcupacion(String ocupacion) {
        this.ocupacion = ocupacion;
    }

    public Boolean isAfiliadoSSS() {
        return afiliadoSSS;
    }

    public Paciente afiliadoSSS(Boolean afiliadoSSS) {
        this.afiliadoSSS = afiliadoSSS;
        return this;
    }

    public void setAfiliadoSSS(Boolean afiliadoSSS) {
        this.afiliadoSSS = afiliadoSSS;
    }

    public String getCualSSS() {
        return cualSSS;
    }

    public Paciente cualSSS(String cualSSS) {
        this.cualSSS = cualSSS;
        return this;
    }

    public void setCualSSS(String cualSSS) {
        this.cualSSS = cualSSS;
    }

    public String getNacionalidad() {
        return nacionalidad;
    }

    public Paciente nacionalidad(String nacionalidad) {
        this.nacionalidad = nacionalidad;
        return this;
    }

    public void setNacionalidad(String nacionalidad) {
        this.nacionalidad = nacionalidad;
    }

    public String getBarrioVive() {
        return barrioVive;
    }

    public Paciente barrioVive(String barrioVive) {
        this.barrioVive = barrioVive;
        return this;
    }

    public void setBarrioVive(String barrioVive) {
        this.barrioVive = barrioVive;
    }

    public String getNumeroTelefono() {
        return numeroTelefono;
    }

    public Paciente numeroTelefono(String numeroTelefono) {
        this.numeroTelefono = numeroTelefono;
        return this;
    }

    public void setNumeroTelefono(String numeroTelefono) {
        this.numeroTelefono = numeroTelefono;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Paciente createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public Paciente updatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Paciente)) {
            return false;
        }
        return id != null && id.equals(((Paciente) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Paciente{" +
            "id=" + getId() +
            ", tipoDoc='" + getTipoDoc() + "'" +
            ", numeroDocumento='" + getNumeroDocumento() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", apellido='" + getApellido() + "'" +
            ", genero='" + getGenero() + "'" +
            ", fechaNacimiento='" + getFechaNacimiento() + "'" +
            ", acudiente='" + getAcudiente() + "'" +
            ", ocupacion='" + getOcupacion() + "'" +
            ", afiliadoSSS='" + isAfiliadoSSS() + "'" +
            ", cualSSS='" + getCualSSS() + "'" +
            ", nacionalidad='" + getNacionalidad() + "'" +
            ", barrioVive='" + getBarrioVive() + "'" +
            ", numeroTelefono='" + getNumeroTelefono() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
