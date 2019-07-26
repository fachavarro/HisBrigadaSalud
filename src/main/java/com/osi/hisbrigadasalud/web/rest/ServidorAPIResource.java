package com.osi.hisbrigadasalud.web.rest;

import com.osi.hisbrigadasalud.domain.ServidorAPI;
import com.osi.hisbrigadasalud.repository.ServidorAPIRepository;
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
 * REST controller for managing {@link com.osi.hisbrigadasalud.domain.ServidorAPI}.
 */
@RestController
@RequestMapping("/api")
public class ServidorAPIResource {

    private final Logger log = LoggerFactory.getLogger(ServidorAPIResource.class);

    private static final String ENTITY_NAME = "servidorAPI";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ServidorAPIRepository servidorAPIRepository;

    public ServidorAPIResource(ServidorAPIRepository servidorAPIRepository) {
        this.servidorAPIRepository = servidorAPIRepository;
    }

    /**
     * {@code POST  /servidor-apis} : Create a new servidorAPI.
     *
     * @param servidorAPI the servidorAPI to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new servidorAPI, or with status {@code 400 (Bad Request)} if the servidorAPI has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/servidor-apis")
    public ResponseEntity<ServidorAPI> createServidorAPI(@Valid @RequestBody ServidorAPI servidorAPI) throws URISyntaxException {
        log.debug("REST request to save ServidorAPI : {}", servidorAPI);
        if (servidorAPI.getId() != null) {
            throw new BadRequestAlertException("A new servidorAPI cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ServidorAPI result = servidorAPIRepository.save(servidorAPI);
        return ResponseEntity.created(new URI("/api/servidor-apis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /servidor-apis} : Updates an existing servidorAPI.
     *
     * @param servidorAPI the servidorAPI to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated servidorAPI,
     * or with status {@code 400 (Bad Request)} if the servidorAPI is not valid,
     * or with status {@code 500 (Internal Server Error)} if the servidorAPI couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/servidor-apis")
    public ResponseEntity<ServidorAPI> updateServidorAPI(@Valid @RequestBody ServidorAPI servidorAPI) throws URISyntaxException {
        log.debug("REST request to update ServidorAPI : {}", servidorAPI);
        if (servidorAPI.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ServidorAPI result = servidorAPIRepository.save(servidorAPI);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, servidorAPI.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /servidor-apis} : get all the servidorAPIS.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of servidorAPIS in body.
     */
    @GetMapping("/servidor-apis")
    public List<ServidorAPI> getAllServidorAPIS() {
        log.debug("REST request to get all ServidorAPIS");
        return servidorAPIRepository.findAll();
    }

    /**
     * {@code GET  /servidor-apis/:id} : get the "id" servidorAPI.
     *
     * @param id the id of the servidorAPI to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the servidorAPI, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/servidor-apis/{id}")
    public ResponseEntity<ServidorAPI> getServidorAPI(@PathVariable String id) {
        log.debug("REST request to get ServidorAPI : {}", id);
        Optional<ServidorAPI> servidorAPI = servidorAPIRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(servidorAPI);
    }

    /**
     * {@code DELETE  /servidor-apis/:id} : delete the "id" servidorAPI.
     *
     * @param id the id of the servidorAPI to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/servidor-apis/{id}")
    public ResponseEntity<Void> deleteServidorAPI(@PathVariable String id) {
        log.debug("REST request to delete ServidorAPI : {}", id);
        servidorAPIRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
