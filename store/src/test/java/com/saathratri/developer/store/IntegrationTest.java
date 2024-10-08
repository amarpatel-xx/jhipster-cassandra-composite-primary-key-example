package com.saathratri.developer.store;

import com.saathratri.developer.store.config.AsyncSyncConfiguration;
import com.saathratri.developer.store.config.EmbeddedCassandra;
import com.saathratri.developer.store.config.JacksonConfiguration;
import com.saathratri.developer.store.config.TestSecurityConfiguration;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Base composite annotation for integration tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(classes = { StoreApp.class, JacksonConfiguration.class, AsyncSyncConfiguration.class, TestSecurityConfiguration.class })
@EmbeddedCassandra
public @interface IntegrationTest {
}
