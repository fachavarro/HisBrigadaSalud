package com.osi.hisbrigadasalud.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Brigada.
 */
@Document(collection = "brigada")
public class Brigada implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("descripcion")
    private String descripcion;

    @NotNull
    @Field("lugar")
    private String lugar;

    @NotNull
    @Field("ciudad")
    private String ciudad;

    @NotNull
    @Field("fechai")
    private Instant fechai;

    @NotNull
    @Field("fechaf")
    private Instant fechaf;

    @Field("created_at")
    private Instant createdAt;

    @Field("updated_at")
    private Instant updatedAt;

    @DBRef
    @Field("atencion")
    @com.fasterxml.jackson.annotation.JsonBackReference
    private Atencion atencion;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Brigada descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getLugar() {
        return lugar;
    }

    public Brigada lugar(String lugar) {
        this.lugar = lugar;
        return this;
    }

    public void setLugar(String lugar) {
        this.lugar = lugar;
    }

    public String getCiudad() {
        return ciudad;
    }

    public Brigada ciudad(String ciudad) {
        this.ciudad = ciudad;
        return this;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public Instant getFechai() {
        return fechai;
    }

    public Brigada fechai(Instant fechai) {
        this.fechai = fechai;
        return this;
    }

    public void setFechai(Instant fechai) {
        this.fechai = fechai;
    }

    public Instant getFechaf() {
        return fechaf;
    }

    public Brigada fechaf(Instant fechaf) {
        this.fechaf = fechaf;
        return this;
    }

    public void setFechaf(Instant fechaf) {
        this.fechaf = fechaf;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Brigada createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public Brigada updatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Atencion getAtencion() {
        return atencion;
    }

    public Brigada atencion(Atencion atencion) {
        this.atencion = atencion;
        return this;
    }

    public void setAtencion(Atencion atencion) {
        this.atencion = atencion;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Brigada)) {
            return false;
        }
        return id != null && id.equals(((Brigada) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Brigada{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            ", lugar='" + getLugar() + "'" +
            ", ciudad='" + getCiudad() + "'" +
            ", fechai='" + getFechai() + "'" +
            ", fechaf='" + getFechaf() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
