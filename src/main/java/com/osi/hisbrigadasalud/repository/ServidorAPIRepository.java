package com.osi.hisbrigadasalud.repository;

import com.osi.hisbrigadasalud.domain.ServidorAPI;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the ServidorAPI entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServidorAPIRepository extends MongoRepository<ServidorAPI, String> {

}
