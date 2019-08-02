package com.osi.hisbrigadasalud.web.rest;

import com.osi.hisbrigadasalud.domain.Brigada;
import com.osi.hisbrigadasalud.repository.BrigadaRepository;
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
 * REST controller for managing {@link com.osi.hisbrigadasalud.domain.Brigada}.
 */
@RestController
@RequestMapping("/api")
public class BrigadaResource {

    private final Logger log = LoggerFactory.getLogger(BrigadaResource.class);

    private static final String ENTITY_NAME = "brigada";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BrigadaRepository brigadaRepository;

    public BrigadaResource(BrigadaRepository brigadaRepository) {
        this.brigadaRepository = brigadaRepository;
    }

    /**
     * {@code POST  /brigadas} : Create a new brigada.
     *
     * @param brigada the brigada to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new brigada, or with status {@code 400 (Bad Request)} if the brigada has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/brigadas")
    public ResponseEntity<Brigada> createBrigada(@Valid @RequestBody Brigada brigada) throws URISyntaxException {
        log.debug("REST request to save Brigada : {}", brigada);
        if (brigada.getId() != null) {
            throw new BadRequestAlertException("A new brigada cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Brigada result = brigadaRepository.save(brigada);
        return ResponseEntity.created(new URI("/api/brigadas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /brigadas} : Updates an existing brigada.
     *
     * @param brigada the brigada to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated brigada,
     * or with status {@code 400 (Bad Request)} if the brigada is not valid,
     * or with status {@code 500 (Internal Server Error)} if the brigada couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/brigadas")
    public ResponseEntity<Brigada> updateBrigada(@Valid @RequestBody Brigada brigada) throws URISyntaxException {
        log.debug("REST request to update Brigada : {}", brigada);
        if (brigada.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Brigada result = brigadaRepository.save(brigada);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, brigada.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /brigadas} : get all the brigadas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of brigadas in body.
     */
    @GetMapping("/brigadas")
    public List<Brigada> getAllBrigadas() {
        log.debug("REST request to get all Brigadas");
        return brigadaRepository.findAll();
    }

    /**
     * {@code GET  /brigadas/:id} : get the "id" brigada.
     *
     * @param id the id of the brigada to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the brigada, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/brigadas/{id}")
    public ResponseEntity<Brigada> getBrigada(@PathVariable String id) {
        log.debug("REST request to get Brigada : {}", id);
        Optional<Brigada> brigada = brigadaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(brigada);
    }

    /**
     * {@code DELETE  /brigadas/:id} : delete the "id" brigada.
     *
     * @param id the id of the brigada to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/brigadas/{id}")
    public ResponseEntity<Void> deleteBrigada(@PathVariable String id) {
        log.debug("REST request to delete Brigada : {}", id);
        brigadaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
