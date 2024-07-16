package com.saathratri.developer.blog.service.impl;

import com.saathratri.developer.blog.domain.Post;
import com.saathratri.developer.blog.domain.PostId;
import com.saathratri.developer.blog.repository.PostRepository;
import com.saathratri.developer.blog.service.PostService;
import com.saathratri.developer.blog.service.dto.PostDTO;
import com.saathratri.developer.blog.service.mapper.PostMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link com.saathratri.developer.blog.domain.Post}.
 */
@Service
public class PostServiceImpl implements PostService {

    private final Logger log = LoggerFactory.getLogger(PostServiceImpl.class);

    private final PostRepository postRepository;

    private final PostMapper postMapper;

    public PostServiceImpl(PostRepository postRepository, PostMapper postMapper) {
        this.postRepository = postRepository;
        this.postMapper = postMapper;
    }

    @Override
    public PostDTO save(PostDTO postDTO) {
        log.debug("Request to save Post : {}", postDTO);
        Post post = postMapper.toEntity(postDTO);
        post = postRepository.save(post);
        log.debug("Saved post : {}", post);
        return postMapper.toDto(post);
    }

    @Override
    public PostDTO update(PostDTO postDTO) {
        log.debug("Request to update Post : {}", postDTO);
        Post post = postMapper.toEntity(postDTO);
        post = postRepository.save(post);
        log.debug("Saved post : {}", post);
        return postMapper.toDto(post);
    }

    @Override
    public Optional<PostDTO> partialUpdate(PostDTO postDTO) {
        log.debug("Request to partially update Post : {}", postDTO);

        return postRepository
            .findById(
                new PostId(
                    postDTO.getCompositeId().getCreatedDate(),
                    postDTO.getCompositeId().getAddedDateTime(),
                    postDTO.getCompositeId().getPostId()
                )
            )
            .map(existingPost -> {
                postMapper.partialUpdate(existingPost, postDTO);

                return existingPost;
            })
            .map(postRepository::save)
            .map(postMapper::toDto);
    }

    @Override
    public List<PostDTO> findAll() {
        log.debug("Request to get all Posts");
        return postRepository.findAll().stream().map(postMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    public Optional<PostDTO> findOne(PostId compositeId) {
        log.debug("Request to get Post : {}", compositeId);
        return postRepository.findById(compositeId).map(postMapper::toDto);
    }

    @Override
    public void delete(PostId compositeId) {
        log.debug("Request to delete Post : {}", compositeId);
        postRepository.deleteById(compositeId);
    }

    @Override
    public List<PostDTO> findByCompositeIdCreatedDate(final Long createdDate) {
        log.debug("Request to findByCompositeIdCreatedDate(final Long createdDate) service in PostServiceImpl.");
        return postRepository
            .findByCompositeIdCreatedDate(createdDate)
            .stream()
            .map(postMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    public List<PostDTO> findByCompositeIdCreatedDateLessThan(final Long createdDate) {
        log.debug("Request to findByCompositeIdCreatedDateLessThan(final Long createdDate) service in PostServiceImpl.");
        return postRepository
            .findByCompositeIdCreatedDateLessThan(createdDate)
            .stream()
            .map(postMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    public List<PostDTO> findByCompositeIdCreatedDateGreaterThan(final Long createdDate) {
        log.debug("Request to findByCompositeIdCreatedDateGreaterThan(final Long createdDate) service in PostServiceImpl.");
        return postRepository
            .findByCompositeIdCreatedDateGreaterThan(createdDate)
            .stream()
            .map(postMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    public List<PostDTO> findByCompositeIdCreatedDateAndCompositeIdAddedDateTime(final Long createdDate, final Long addedDateTime) {
        log.debug(
            "Request to findByCompositeIdCreatedDateAndCompositeIdAddedDateTime(final Long createdDate, final Long addedDateTime) service in PostServiceImpl."
        );
        return postRepository
            .findByCompositeIdCreatedDateAndCompositeIdAddedDateTime(createdDate, addedDateTime)
            .stream()
            .map(postMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    public List<PostDTO> findByCompositeIdCreatedDateAndCompositeIdAddedDateTimeLessThan(final Long createdDate, final Long addedDateTime) {
        log.debug(
            "Request to findByCompositeIdCreatedDateAndCompositeIdAddedDateTimeLessThan(final Long createdDate, final Long addedDateTime) service in PostServiceImpl."
        );
        return postRepository
            .findByCompositeIdCreatedDateAndCompositeIdAddedDateTimeLessThan(createdDate, addedDateTime)
            .stream()
            .map(postMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    public List<PostDTO> findByCompositeIdCreatedDateAndCompositeIdAddedDateTimeGreaterThan(
        final Long createdDate,
        final Long addedDateTime
    ) {
        log.debug(
            "Request to findByCompositeIdCreatedDateAndCompositeIdAddedDateTimeGreaterThan(final Long createdDate, final Long addedDateTime) service in PostServiceImpl."
        );
        return postRepository
            .findByCompositeIdCreatedDateAndCompositeIdAddedDateTimeGreaterThan(createdDate, addedDateTime)
            .stream()
            .map(postMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }
}