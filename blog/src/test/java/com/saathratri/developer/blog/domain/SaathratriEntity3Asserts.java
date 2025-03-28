package com.saathratri.developer.blog.domain;

import static com.saathratri.developer.blog.domain.AssertUtils.bigDecimalCompareTo;
import static org.assertj.core.api.Assertions.assertThat;

public class SaathratriEntity3Asserts {

    /**
     * Asserts that the entity has all properties (fields) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSaathratriEntity3AllPropertiesEquals(SaathratriEntity3 expected, SaathratriEntity3 actual) {
        assertSaathratriEntity3AutoGeneratedPropertiesEquals(expected, actual);
        assertSaathratriEntity3AllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSaathratriEntity3AllUpdatablePropertiesEquals(SaathratriEntity3 expected, SaathratriEntity3 actual) {
        assertSaathratriEntity3UpdatableFieldsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSaathratriEntity3AutoGeneratedPropertiesEquals(SaathratriEntity3 expected, SaathratriEntity3 actual) {}

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSaathratriEntity3UpdatableFieldsEquals(SaathratriEntity3 expected, SaathratriEntity3 actual) {
        assertThat(expected)
            .as("Verify SaathratriEntity3 relevant properties")
            .satisfies(e -> assertThat(e.getEntityName()).as("check entityName").isEqualTo(actual.getEntityName()))
            .satisfies(e -> assertThat(e.getEntityDescription()).as("check entityDescription").isEqualTo(actual.getEntityDescription()))
            .satisfies(e ->
                assertThat(e.getEntityCost()).as("check entityCost").usingComparator(bigDecimalCompareTo).isEqualTo(actual.getEntityCost())
            )
            .satisfies(e -> assertThat(e.getDepartureDate()).as("check departureDate").isEqualTo(actual.getDepartureDate()))
            .satisfies(e -> assertThat(e.getTags()).as("check tags").isEqualTo(actual.getTags()));
    }
}
