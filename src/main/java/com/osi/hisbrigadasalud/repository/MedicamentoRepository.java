package com.osi.hisbrigadasalud.repository;

import com.osi.hisbrigadasalud.domain.Medicamento;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Medicamento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedicamentoRepository extends MongoRepository<Medicamento, String> {

}
