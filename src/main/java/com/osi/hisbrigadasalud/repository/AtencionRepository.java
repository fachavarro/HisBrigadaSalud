package com.osi.hisbrigadasalud.repository;

import com.osi.hisbrigadasalud.domain.Atencion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data MongoDB repository for the Atencion entity.
 */
@Repository
public interface AtencionRepository extends MongoRepository<Atencion, String> {

    @Query("{}")
    Page<Atencion> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<Atencion> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<Atencion> findOneWithEagerRelationships(String id);

}
