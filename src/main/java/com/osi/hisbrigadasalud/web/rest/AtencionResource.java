package com.osi.hisbrigadasalud.web.rest;

import com.osi.hisbrigadasalud.domain.Atencion;
import com.osi.hisbrigadasalud.repository.AtencionRepository;
import com.osi.hisbrigadasalud.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.osi.hisbrigadasalud.domain.Atencion}.
 */
@RestController
@RequestMapping("/api")
public class AtencionResource {

    private final Logger log = LoggerFactory.getLogger(AtencionResource.class);

    private static final String ENTITY_NAME = "atencion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AtencionRepository atencionRepository;

    public AtencionResource(AtencionRepository atencionRepository) {
        this.atencionRepository = atencionRepository;
    }

    /**
     * {@code POST  /atencions} : Create a new atencion.
     *
     * @param atencion the atencion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new atencion, or with status {@code 400 (Bad Request)} if the atencion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/atencions")
    public ResponseEntity<Atencion> createAtencion(@Valid @RequestBody Atencion atencion) throws URISyntaxException {
        log.debug("REST request to save Atencion : {}", atencion);
        if (atencion.getId() != null) {
            throw new BadRequestAlertException("A new atencion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Atencion result = atencionRepository.save(atencion);
        return ResponseEntity.created(new URI("/api/atencions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /atencions} : Updates an existing atencion.
     *
     * @param atencion the atencion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated atencion,
     * or with status {@code 400 (Bad Request)} if the atencion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the atencion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/atencions")
    public ResponseEntity<Atencion> updateAtencion(@Valid @RequestBody Atencion atencion) throws URISyntaxException {
        log.debug("REST request to update Atencion : {}", atencion);
        if (atencion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Atencion result = atencionRepository.save(atencion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, atencion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /atencions} : get all the atencions.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of atencions in body.
     */
    @GetMapping("/atencions")
    public List<Atencion> getAllAtencions(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Atencions");
        return atencionRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /atencions/:id} : get the "id" atencion.
     *
     * @param id the id of the atencion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the atencion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/atencions/{id}")
    public ResponseEntity<Atencion> getAtencion(@PathVariable String id) {
        log.debug("REST request to get Atencion : {}", id);
        Optional<Atencion> atencion = atencionRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(atencion);
    }

    /**
     * {@code DELETE  /atencions/:id} : delete the "id" atencion.
     *
     * @param id the id of the atencion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/atencions/{id}")
    public ResponseEntity<Void> deleteAtencion(@PathVariable String id) {
        log.debug("REST request to delete Atencion : {}", id);
        atencionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
