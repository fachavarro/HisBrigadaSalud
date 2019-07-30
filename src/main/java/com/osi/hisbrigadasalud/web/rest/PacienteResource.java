package com.osi.hisbrigadasalud.web.rest;

import com.osi.hisbrigadasalud.domain.Paciente;
import com.osi.hisbrigadasalud.repository.PacienteRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.osi.hisbrigadasalud.domain.Paciente}.
 */
@RestController
@RequestMapping("/api")
public class PacienteResource {

    private final Logger log = LoggerFactory.getLogger(PacienteResource.class);

    private static final String ENTITY_NAME = "paciente";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PacienteRepository pacienteRepository;

    public PacienteResource(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    /**
     * {@code POST  /pacientes} : Create a new paciente.
     *
     * @param paciente the paciente to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new paciente, or with status {@code 400 (Bad Request)} if the paciente has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pacientes")
    public ResponseEntity<Paciente> createPaciente(@Valid @RequestBody Paciente paciente) throws URISyntaxException {
        log.debug("REST request to save Paciente : {}", paciente);
        if (paciente.getId() != null) {
            throw new BadRequestAlertException("A new paciente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Paciente result = pacienteRepository.save(paciente);
        return ResponseEntity.created(new URI("/api/pacientes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pacientes} : Updates an existing paciente.
     *
     * @param paciente the paciente to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated paciente,
     * or with status {@code 400 (Bad Request)} if the paciente is not valid,
     * or with status {@code 500 (Internal Server Error)} if the paciente couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pacientes")
    public ResponseEntity<Paciente> updatePaciente(@Valid @RequestBody Paciente paciente) throws URISyntaxException {
        log.debug("REST request to update Paciente : {}", paciente);
        if (paciente.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Paciente result = pacienteRepository.save(paciente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, paciente.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /pacientes} : get all the pacientes.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pacientes in body.
     */
    @GetMapping("/pacientes")
    public List<Paciente> getAllPacientes(@RequestParam(required = false) String filter) {
        if ("atencion-is-null".equals(filter)) {
            log.debug("REST request to get all Pacientes where atencion is null");
            return StreamSupport
                .stream(pacienteRepository.findAll().spliterator(), false)
                .filter(paciente -> paciente.getAtencion() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Pacientes");
        return pacienteRepository.findAll();
    }

    /**
     * {@code GET  /pacientes/:id} : get the "id" paciente.
     *
     * @param id the id of the paciente to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the paciente, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pacientes/{id}")
    public ResponseEntity<Paciente> getPaciente(@PathVariable String id) {
        log.debug("REST request to get Paciente : {}", id);
        Optional<Paciente> paciente = pacienteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(paciente);
    }
    
    @GetMapping("/pacientes/{tipoDoc}/{numeroDocumento}")
    public ResponseEntity<Paciente> getPaciente(@PathVariable String tipoDoc, @PathVariable String numeroDocumento ) {
    	Optional<Paciente> paciente  = null;
    	String idDefault = "-1";
    	log.debug("REST request to get Paciente : {}", tipoDoc +"  {}:"+numeroDocumento);
        List<Paciente> listPacientes = pacienteRepository.findAll();
        for (Paciente dto:listPacientes) {
        	if (dto.getTipoDoc().equalsIgnoreCase(tipoDoc) && dto.getNumeroDocumento().equals(numeroDocumento)) {
        		paciente =  pacienteRepository.findById(dto.getId());
        		break;
        	}
        }
        
        if (paciente == null) {
        	paciente =  pacienteRepository.findById(idDefault);
        }
        
        //Optional<Paciente> paciente = pacienteRepository.findById(tipoId);
        return ResponseUtil.wrapOrNotFound(paciente);
    }

    /**
     * {@code DELETE  /pacientes/:id} : delete the "id" paciente.
     *
     * @param id the id of the paciente to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pacientes/{id}")
    public ResponseEntity<Void> deletePaciente(@PathVariable String id) {
        log.debug("REST request to delete Paciente : {}", id);
        pacienteRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
