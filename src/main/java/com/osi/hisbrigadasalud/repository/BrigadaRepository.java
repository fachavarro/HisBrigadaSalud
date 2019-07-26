package com.osi.hisbrigadasalud.repository;

import com.osi.hisbrigadasalud.domain.Brigada;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Brigada entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BrigadaRepository extends MongoRepository<Brigada, String> {

}
