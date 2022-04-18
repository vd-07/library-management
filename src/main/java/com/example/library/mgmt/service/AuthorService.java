package com.example.library.mgmt.service;

import com.example.library.mgmt.domain.Author;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Author}.
 */
public interface AuthorService {
    /**
     * Save a author.
     *
     * @param author the entity to save.
     * @return the persisted entity.
     */
    Author save(Author author);

    /**
     * Updates a author.
     *
     * @param author the entity to update.
     * @return the persisted entity.
     */
    Author update(Author author);

    /**
     * Partially updates a author.
     *
     * @param author the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Author> partialUpdate(Author author);

    /**
     * Get all the authors.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Author> findAll(Pageable pageable);

    /**
     * Get all the authors with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Author> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" author.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Author> findOne(Long id);

    /**
     * Delete the "id" author.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
