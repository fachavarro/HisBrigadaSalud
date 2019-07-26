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
 * A Usuario.
 */
@Document(collection = "usuario")
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("tipo_doc")
    private String tipoDoc;

    @NotNull
    @Field("numero_documento")
    private String numeroDocumento;

    @NotNull
    @Field("nombre")
    private String nombre;

    @NotNull
    @Field("apellido")
    private String apellido;

    @NotNull
    @Field("genero")
    private String genero;

    @NotNull
    @Field("especialidad")
    private String especialidad;

    @NotNull
    @Field("nombre_usuario")
    private String nombreUsuario;

    @NotNull
    @Field("contrasena")
    private String contrasena;

    @Field("cargado_sistema")
    private Boolean cargadoSistema;

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

    public String getTipoDoc() {
        return tipoDoc;
    }

    public Usuario tipoDoc(String tipoDoc) {
        this.tipoDoc = tipoDoc;
        return this;
    }

    public void setTipoDoc(String tipoDoc) {
        this.tipoDoc = tipoDoc;
    }

    public String getNumeroDocumento() {
        return numeroDocumento;
    }

    public Usuario numeroDocumento(String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
        return this;
    }

    public void setNumeroDocumento(String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
    }

    public String getNombre() {
        return nombre;
    }

    public Usuario nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public Usuario apellido(String apellido) {
        this.apellido = apellido;
        return this;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getGenero() {
        return genero;
    }

    public Usuario genero(String genero) {
        this.genero = genero;
        return this;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getEspecialidad() {
        return especialidad;
    }

    public Usuario especialidad(String especialidad) {
        this.especialidad = especialidad;
        return this;
    }

    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public Usuario nombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
        return this;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getContrasena() {
        return contrasena;
    }

    public Usuario contrasena(String contrasena) {
        this.contrasena = contrasena;
        return this;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public Boolean isCargadoSistema() {
        return cargadoSistema;
    }

    public Usuario cargadoSistema(Boolean cargadoSistema) {
        this.cargadoSistema = cargadoSistema;
        return this;
    }

    public void setCargadoSistema(Boolean cargadoSistema) {
        this.cargadoSistema = cargadoSistema;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Usuario createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public Usuario updatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Atencion getAtencion() {
        return atencion;
    }

    public Usuario atencion(Atencion atencion) {
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
        if (!(o instanceof Usuario)) {
            return false;
        }
        return id != null && id.equals(((Usuario) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Usuario{" +
            "id=" + getId() +
            ", tipoDoc='" + getTipoDoc() + "'" +
            ", numeroDocumento='" + getNumeroDocumento() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", apellido='" + getApellido() + "'" +
            ", genero='" + getGenero() + "'" +
            ", especialidad='" + getEspecialidad() + "'" +
            ", nombreUsuario='" + getNombreUsuario() + "'" +
            ", contrasena='" + getContrasena() + "'" +
            ", cargadoSistema='" + isCargadoSistema() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
