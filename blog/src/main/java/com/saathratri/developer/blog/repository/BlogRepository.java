package com.saathratri.developer.blog.repository;

import com.saathratri.developer.blog.domain.Blog;
import com.saathratri.developer.blog.domain.BlogId;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data Cassandra repository for the Blog entity.
 */
@Repository
public interface BlogRepository extends CassandraRepository<Blog, BlogId> {
    List<Blog> findAllByCompositeIdCategory(final String category);

    List<Blog> findAllByCompositeIdCategoryAndCompositeIdBlogId(final String category, final UUID blogId);

    List<Blog> findAllByCompositeIdCategoryAndCompositeIdBlogIdLessThan(final String category, final UUID blogId);

    List<Blog> findAllByCompositeIdCategoryAndCompositeIdBlogIdGreaterThan(final String category, final UUID blogId);

    @Query("SELECT * FROM blog WHERE category = ?0 AND blog_id = ?1 LIMIT 1")
    Optional<Blog> findLatestByCompositeIdCategoryAndCompositeIdBlogId(final String category, final UUID blogId);
}
