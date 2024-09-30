package com.saathratri.developer.store.domain;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.nio.ByteBuffer;
import java.time.LocalDate;
import java.util.UUID;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.Table;

/**
 * A Product.
 */
// Since spring-data-cassandra 3.4.2, table names needs to be in lowercase
// See https://github.com/spring-projects/spring-data-cassandra/issues/1293#issuecomment-1192555467
@Table("product")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id")
    @CassandraType(type = CassandraType.Name.UUID)
    private UUID id;

    @NotNull
    @Column("title")
    @CassandraType(type = CassandraType.Name.TEXT)
    private String title;

    @NotNull
    @DecimalMin(value = "0")
    @Column("price")
    @CassandraType(type = CassandraType.Name.DECIMAL)
    private BigDecimal price;

    @Column("image_content_type")
    @CassandraType(type = CassandraType.Name.TEXT)
    private String imageContentType;

    @Column("image")
    @CassandraType(type = CassandraType.Name.BLOB)
    private ByteBuffer image;

    @NotNull
    @Column("added_date")
    @CassandraType(type = CassandraType.Name.DATE)
    private LocalDate addedDate;

    @Column("added_date_time")
    @CassandraType(type = CassandraType.Name.BIGINT)
    private Long addedDateTime;

    public UUID getId() {
        return this.id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Product id(UUID id) {
        this.id = id;
        return this;
    }

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getTitle() {
        return this.title;
    }

    public Product title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public BigDecimal getPrice() {
        return this.price;
    }

    public Product price(BigDecimal price) {
        this.setPrice(price);
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public ByteBuffer getImage() {
        return this.image;
    }

    public Product image(ByteBuffer image) {
        this.setImage(image);
        return this;
    }

    public void setImage(ByteBuffer image) {
        this.image = image;
    }

    public String getImageContentType() {
        return this.imageContentType;
    }

    public Product imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public LocalDate getAddedDate() {
        return this.addedDate;
    }

    public Product addedDate(LocalDate addedDate) {
        this.setAddedDate(addedDate);
        return this;
    }

    public void setAddedDate(LocalDate addedDate) {
        this.addedDate = addedDate;
    }

    public Long getAddedDateTime() {
        return this.addedDateTime;
    }

    public Product addedDateTime(Long addedDateTime) {
        this.setAddedDateTime(addedDateTime);
        return this;
    }

    public void setAddedDateTime(Long addedDateTime) {
        this.addedDateTime = addedDateTime;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return getId() != null && getId().equals(((Product) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", price=" + getPrice() +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", addedDate='" + getAddedDate() + "'" +
            ", addedDateTime=" + getAddedDateTime() +
            "}";
    }
}
