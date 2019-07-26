package com.osi.hisbrigadasalud.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

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

    @Field("otra_especialidad")
    private String otraEspecialidad;

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
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
