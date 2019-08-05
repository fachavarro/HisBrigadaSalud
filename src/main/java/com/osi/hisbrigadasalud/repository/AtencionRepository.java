package com.osi.hisbrigadasalud.repository;

import com.osi.hisbrigadasalud.domain.Atencion;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Atencion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AtencionRepository extends MongoRepository<Atencion, String> {

}
