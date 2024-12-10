package com.saathratri.developer.blog.repository;

import com.saathratri.developer.blog.domain.Blog;
import com.saathratri.developer.blog.domain.BlogId;
import java.util.List;
import java.util.Optional;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data Cassandra repository for the Blog entity.
 */
@Repository
public interface BlogRepository extends CassandraRepository<Blog, BlogId> {
    List<Blog> findAllByCompositeIdCategory(final String category);

    @Query("SELECT * FROM blog WHERE category = ?0 LIMIT 1")
    Optional<Blog> findLatestByCompositeIdCategory(final String category);
}
