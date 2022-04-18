package com.example.library.mgmt.repository;

import com.example.library.mgmt.domain.Author;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Author entity.
 */
@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    default Optional<Author> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Author> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Author> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct author from Author author left join fetch author.publisher",
        countQuery = "select count(distinct author) from Author author"
    )
    Page<Author> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct author from Author author left join fetch author.publisher")
    List<Author> findAllWithToOneRelationships();

    @Query("select author from Author author left join fetch author.publisher where author.id =:id")
    Optional<Author> findOneWithToOneRelationships(@Param("id") Long id);
}
