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
 * A Procedimiento.
 */
@Document(collection = "procedimiento")
public class Procedimiento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("nombre_procedimiento")
    private String nombreProcedimiento;

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

    public String getNombreProcedimiento() {
        return nombreProcedimiento;
    }

    public Procedimiento nombreProcedimiento(String nombreProcedimiento) {
        this.nombreProcedimiento = nombreProcedimiento;
        return this;
    }

    public void setNombreProcedimiento(String nombreProcedimiento) {
        this.nombreProcedimiento = nombreProcedimiento;
    }

    public Set<Atencion> getAtencions() {
        return atencions;
    }

    public Procedimiento atencions(Set<Atencion> atencions) {
        this.atencions = atencions;
        return this;
    }

    public Procedimiento addAtencion(Atencion atencion) {
        this.atencions.add(atencion);
        atencion.getProcedimientos().add(this);
        return this;
    }

    public Procedimiento removeAtencion(Atencion atencion) {
        this.atencions.remove(atencion);
        atencion.getProcedimientos().remove(this);
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
        if (!(o instanceof Procedimiento)) {
            return false;
        }
        return id != null && id.equals(((Procedimiento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Procedimiento{" +
            "id=" + getId() +
            ", nombreProcedimiento='" + getNombreProcedimiento() + "'" +
            "}";
    }
}
