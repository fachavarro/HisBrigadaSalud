package com.osi.hisbrigadasalud.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A ServidorAPI.
 */
@Document(collection = "servidor_api")
public class ServidorAPI implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("protocolo")
    private String protocolo;

    @NotNull
    @Field("server")
    private String server;

    @Field("port")
    private String port;

    @Field("estado")
    private String estado;

    @Field("cargado_sistema")
    private Boolean cargadoSistema;

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

    public String getProtocolo() {
        return protocolo;
    }

    public ServidorAPI protocolo(String protocolo) {
        this.protocolo = protocolo;
        return this;
    }

    public void setProtocolo(String protocolo) {
        this.protocolo = protocolo;
    }

    public String getServer() {
        return server;
    }

    public ServidorAPI server(String server) {
        this.server = server;
        return this;
    }

    public void setServer(String server) {
        this.server = server;
    }

    public String getPort() {
        return port;
    }

    public ServidorAPI port(String port) {
        this.port = port;
        return this;
    }

    public void setPort(String port) {
        this.port = port;
    }

    public String getEstado() {
        return estado;
    }

    public ServidorAPI estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Boolean isCargadoSistema() {
        return cargadoSistema;
    }

    public ServidorAPI cargadoSistema(Boolean cargadoSistema) {
        this.cargadoSistema = cargadoSistema;
        return this;
    }

    public void setCargadoSistema(Boolean cargadoSistema) {
        this.cargadoSistema = cargadoSistema;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public ServidorAPI createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public ServidorAPI updatedAt(Instant updatedAt) {
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
        if (!(o instanceof ServidorAPI)) {
            return false;
        }
        return id != null && id.equals(((ServidorAPI) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ServidorAPI{" +
            "id=" + getId() +
            ", protocolo='" + getProtocolo() + "'" +
            ", server='" + getServer() + "'" +
            ", port='" + getPort() + "'" +
            ", estado='" + getEstado() + "'" +
            ", cargadoSistema='" + isCargadoSistema() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
