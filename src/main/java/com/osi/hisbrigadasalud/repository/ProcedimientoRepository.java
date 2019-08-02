package com.osi.hisbrigadasalud.repository;

import com.osi.hisbrigadasalud.domain.Procedimiento;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Procedimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProcedimientoRepository extends MongoRepository<Procedimiento, String> {

}
