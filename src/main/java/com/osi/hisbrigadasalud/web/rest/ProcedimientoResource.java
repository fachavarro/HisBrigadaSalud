package com.osi.hisbrigadasalud.web.rest;

import com.osi.hisbrigadasalud.domain.Procedimiento;
import com.osi.hisbrigadasalud.repository.ProcedimientoRepository;
import com.osi.hisbrigadasalud.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.osi.hisbrigadasalud.domain.Procedimiento}.
 */
@RestController
@RequestMapping("/api")
public class ProcedimientoResource {

    private final Logger log = LoggerFactory.getLogger(ProcedimientoResource.class);

    private static final String ENTITY_NAME = "procedimiento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProcedimientoRepository procedimientoRepository;

    public ProcedimientoResource(ProcedimientoRepository procedimientoRepository) {
        this.procedimientoRepository = procedimientoRepository;
    }

    /**
     * {@code POST  /procedimientos} : Create a new procedimiento.
     *
     * @param procedimiento the procedimiento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new procedimiento, or with status {@code 400 (Bad Request)} if the procedimiento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/procedimientos")
    public ResponseEntity<Procedimiento> createProcedimiento(@RequestBody Procedimiento procedimiento) throws URISyntaxException {
        log.debug("REST request to save Procedimiento : {}", procedimiento);
        if (procedimiento.getId() != null) {
            throw new BadRequestAlertException("A new procedimiento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Procedimiento result = procedimientoRepository.save(procedimiento);
        return ResponseEntity.created(new URI("/api/procedimientos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /procedimientos} : Updates an existing procedimiento.
     *
     * @param procedimiento the procedimiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated procedimiento,
     * or with status {@code 400 (Bad Request)} if the procedimiento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the procedimiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/procedimientos")
    public ResponseEntity<Procedimiento> updateProcedimiento(@RequestBody Procedimiento procedimiento) throws URISyntaxException {
        log.debug("REST request to update Procedimiento : {}", procedimiento);
        if (procedimiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Procedimiento result = procedimientoRepository.save(procedimiento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, procedimiento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /procedimientos} : get all the procedimientos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of procedimientos in body.
     */
    @GetMapping("/procedimientos")
    public List<Procedimiento> getAllProcedimientos() {
        log.debug("REST request to get all Procedimientos");
        return procedimientoRepository.findAll();
    }

    /**
     * {@code GET  /procedimientos/:id} : get the "id" procedimiento.
     *
     * @param id the id of the procedimiento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the procedimiento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/procedimientos/{id}")
    public ResponseEntity<Procedimiento> getProcedimiento(@PathVariable String id) {
        log.debug("REST request to get Procedimiento : {}", id);
        Optional<Procedimiento> procedimiento = procedimientoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(procedimiento);
    }

    /**
     * {@code DELETE  /procedimientos/:id} : delete the "id" procedimiento.
     *
     * @param id the id of the procedimiento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/procedimientos/{id}")
    public ResponseEntity<Void> deleteProcedimiento(@PathVariable String id) {
        log.debug("REST request to delete Procedimiento : {}", id);
        procedimientoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
