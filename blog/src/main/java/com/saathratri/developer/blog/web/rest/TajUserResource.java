package com.saathratri.developer.blog.web.rest;

import com.saathratri.developer.blog.repository.TajUserRepository;
import com.saathratri.developer.blog.service.TajUserService;
import com.saathratri.developer.blog.service.dto.TajUserDTO;
import com.saathratri.developer.blog.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.saathratri.developer.blog.domain.TajUser}.
 */
@RestController
@RequestMapping("/api/taj-users")
public class TajUserResource {

    private static final Logger LOG = LoggerFactory.getLogger(TajUserResource.class);

    private static final String ENTITY_NAME = "blogTajUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TajUserService tajUserService;

    private final TajUserRepository tajUserRepository;

    public TajUserResource(TajUserService tajUserService, TajUserRepository tajUserRepository) {
        this.tajUserService = tajUserService;
        this.tajUserRepository = tajUserRepository;
    }

    /**
     * {@code POST  /taj-users} : Create a new tajUser.
     *
     * @param tajUserDTO the tajUserDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tajUserDTO, or with status {@code 400 (Bad Request)} if the tajUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<TajUserDTO> createTajUser(@Valid @RequestBody TajUserDTO tajUserDTO) throws URISyntaxException {
        LOG.debug("REST request to save TajUser : {}", tajUserDTO);

        // Single-value Primary Key Code
        if (tajUserDTO.getId() == null) {
            throw new BadRequestAlertException("A new tajUser must have an ID", ENTITY_NAME, "idinvalid");
        }

        tajUserDTO = tajUserService.save(tajUserDTO);
        // Single-value Primary Key Code
        return ResponseEntity.created(new URI("/api/taj-users/" + tajUserDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, tajUserDTO.getId().toString()))
            .body(tajUserDTO);
    }

    /**
     * // Single-value Primary Key Code
     * {@code PUT  /taj-users/:id} : Updates an existing tajUser.
     *
     * // Single-value Primary Key Code
     * @param id the id of the tajUserDTO to save.
     * @param tajUserDTO the tajUserDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tajUserDTO,
     * or with status {@code 400 (Bad Request)} if the tajUserDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tajUserDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    // Single-value Primary Key Code
    @PutMapping("/{id}")
    public ResponseEntity<TajUserDTO> updateTajUser(
        // Single-value Primary Key Code
        @PathVariable(value = "id", required = false) final UUID id,
        @Valid @RequestBody TajUserDTO tajUserDTO
    ) throws URISyntaxException {
        // Single-value Primary Key Code
        LOG.debug("REST request to update TajUser : {}, {}", id, tajUserDTO);
        // Single-value Primary Key Code
        if (tajUserDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        // Single-value Primary Key Code
        if (!Objects.equals(id, tajUserDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        // Single-value Primary Key Code
        if (!tajUserRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        tajUserDTO = tajUserService.update(tajUserDTO);
        // Single-value Primary Key Code
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tajUserDTO.getId().toString()))
            .body(tajUserDTO);
    }

    /**
     * // Single-value Primary Key Code
     * {@code PATCH  /taj-users/:id} : Partial updates given fields of an existing tajUser, field will ignore if it is null
     *
     * // Single-value Primary Key Code
     * @param id the id of the tajUserDTO to save.
     * @param tajUserDTO the tajUserDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tajUserDTO,
     * or with status {@code 400 (Bad Request)} if the tajUserDTO is not valid,
     * or with status {@code 404 (Not Found)} if the tajUserDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the tajUserDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    // Single-value Primary Key Code
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TajUserDTO> partialUpdateTajUser(
        // Single-value Primary Key Code
        @PathVariable(value = "id", required = false) final UUID id,
        @NotNull @RequestBody TajUserDTO tajUserDTO
    ) throws URISyntaxException {
        // Single-value Primary Key Code
        LOG.debug("REST request to partial update TajUser partially : {}, {}", id, tajUserDTO);
        // Single-value Primary Key Code
        if (tajUserDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        // Single-value Primary Key Code
        if (!Objects.equals(id, tajUserDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        // Single-value Primary Key Code
        if (!tajUserRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TajUserDTO> result = tajUserService.partialUpdate(tajUserDTO);

        // Single-value Primary Key Code
        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tajUserDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /taj-users} : get all the tajUsers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tajUsers in body.
     */
    @GetMapping("")
    public List<TajUserDTO> getAllTajUsers() {
        LOG.debug("REST request to get all TajUsers");
        return tajUserService.findAll();
    }

    /**
     * // Single-value Primary Key Code
     * {@code GET  /:id} : get the "id" tajUser.
     *
     * // Single-value Primary Key Code
     * @param id the id of the tajUserDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tajUserDTO, or with status {@code 404 (Not Found)}.
     */
    // Single-value Primary Key Code
    @GetMapping("/{id}")
    // Single-value Primary Key Code
    public ResponseEntity<TajUserDTO> getTajUser(@PathVariable("id") UUID id) {
        // Single-value Primary Key Code
        LOG.debug("REST request to get TajUser : {}", id);

        Optional<TajUserDTO> tajUserDTO = tajUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tajUserDTO);
    }

    /**
     * // Single-value Primary Key Code
     * {@code DELETE  /:id} : delete the "id" tajUser.
     *
     * // Single-value Primary Key Code
     * @param id the id of the tajUserDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    // Single-value Primary Key Code
    @DeleteMapping("/{id}")
    // Single-value Primary Key Code
    public ResponseEntity<Void> deleteTajUser(@PathVariable("id") UUID id) {
        // Single-value Primary Key Code
        LOG.debug("REST request to delete TajUser : {}", id);
        tajUserService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    private String getUrlEncodedParameterValue(String parameterValue) {
        String encodedValue = null;
        try {
            encodedValue = URLEncoder.encode(parameterValue, StandardCharsets.UTF_8);
            LOG.info("Encoded String '{}' is '{}'.", parameterValue, encodedValue);
        } catch (Exception e) {
            LOG.error(e.getMessage(), e);
        }
        return encodedValue;
    }
}
