package com.osi.hisbrigadasalud.repository;

import com.osi.hisbrigadasalud.domain.Paciente;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Paciente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PacienteRepository extends MongoRepository<Paciente, String> {

}
