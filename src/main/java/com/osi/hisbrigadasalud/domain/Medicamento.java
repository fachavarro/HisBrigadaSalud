package com.osi.hisbrigadasalud.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Medicamento.
 */
@Document(collection = "medicamento")
public class Medicamento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("nombre_medicamento")
    private String nombreMedicamento;

    @DBRef
    @Field("atencions")
    @JsonIgnore
    private Set<Atencion> atencions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombreMedicamento() {
        return nombreMedicamento;
    }

    public Medicamento nombreMedicamento(String nombreMedicamento) {
        this.nombreMedicamento = nombreMedicamento;
        return this;
    }

    public void setNombreMedicamento(String nombreMedicamento) {
        this.nombreMedicamento = nombreMedicamento;
    }

    public Set<Atencion> getAtencions() {
        return atencions;
    }

    public Medicamento atencions(Set<Atencion> atencions) {
        this.atencions = atencions;
        return this;
    }

    public Medicamento addAtencion(Atencion atencion) {
        this.atencions.add(atencion);
        atencion.getMedicamentos().add(this);
        return this;
    }

    public Medicamento removeAtencion(Atencion atencion) {
        this.atencions.remove(atencion);
        atencion.getMedicamentos().remove(this);
        return this;
    }

    public void setAtencions(Set<Atencion> atencions) {
        this.atencions = atencions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Medicamento)) {
            return false;
        }
        return id != null && id.equals(((Medicamento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Medicamento{" +
            "id=" + getId() +
            ", nombreMedicamento='" + getNombreMedicamento() + "'" +
            "}";
    }
}
