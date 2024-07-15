::: {#header}
# JHipster Example for Composite Primary Keys in Cassandra
:::

:::::::::::::::::::::::::::::::::::::: {#content}
:::::::::::: {#preamble}
::::::::::: sectionbody
::: paragraph
This code was generated using the JHipster blueprint
\"generator-jhipster-cassandra-composite-primary-key\" (the source code
is available at:
[https://github.com/amarpatel-xx/generator-jhipster-cassandra-composite-primary-key](https://github.com/amarpatel-xx/generator-jhipster-cassandra-composite-primary-key){.bare}).
The blueprint for generating the composite primary key with Cassandra
entities is open source software made with love by Amar Premsaran Patel.
This code in this example has a JDL which shows 2 Cassandra entities
that have composite primary keys and 3 Cassandra entities that have
single-value primary keys. The example entities in the JDL is based on
Matt Raible's frequently used examples in his capability demonstrations.
The current blueprint only supports a single field of type
PrimaryKeyType.PARTITIONED; a field which is the partition column is
specified as such with the
\@customAnnotation(\"PrimaryKeyType.PARTITIONED\") custom annotation. In
the future, the blueprint can be modified to support multiple fields
with PrimaryKeyType.PARTITIONED types. Nevertheless, if a entity needs
to specify additional fields with type PrimaryKeyType.CLUSTERED, they
are specified using \@customAnnotation(\"PrimaryKeyType.CLUSTERED\").
There are no relationships between Cassandra entities, as such
relationships cannot be specified. The blueprint that this exmaple
utilizes also support CassandraType.Name.SET.
:::

::: {.olist .arabic}
1.  Below is the example using the \@customAnnotation methodology to
    specify the details of the Cassandra composite primary key. Also,
    below is an example of a single-value primary key entity.
:::

:::: listingblock
::: content
    // Composite Primary Key Example:
    entity Post {
      @Id @customAnnotation("PrimaryKeyType.PARTITIONED") @customAnnotation("CassandraType.Name.BIGINT") @customAnnotation("UTC_DATE") @customAnnotation("0") createdDate Long
      // Do not name composite primary key fields as 'id' as it conflicts with the 'id' field in the JHipster entity.
      @customAnnotation("PrimaryKeyType.CLUSTERED") @customAnnotation("CassandraType.Name.BIGINT") @customAnnotation("UTC_DATETIME") @customAnnotation("1") addedDateTime Long
      @customAnnotation("PrimaryKeyType.CLUSTERED") @customAnnotation("CassandraType.Name.UUID") @customAnnotation("") @customAnnotation("2") postId UUID
      @customAnnotation("") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") @customAnnotation("") title String required
      @customAnnotation("") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") @customAnnotation("") content String required
    }

    // Single-value Primary Key Example:
    entity Product {
      // Primary Key field can be named 'id'.  JHipster natively supports single-value primary keys.  This blueprint also supports single-value primary keys.
      @Id @customAnnotation("PrimaryKeyType.PARTITIONED") @customAnnotation("CassandraType.Name.UUID") @customAnnotation("") @customAnnotation("") id UUID
      @customAnnotation("") @customAnnotation("CassandraType.Name.TEXT") @customAnnotation("") @customAnnotation("") title String required
      @customAnnotation("") @customAnnotation("CassandraType.Name.DECIMAL") @customAnnotation("") @customAnnotation("") price BigDecimal required min(0)
      @customAnnotation("") @customAnnotation("CassandraType.Name.BLOB") @customAnnotation("image") @customAnnotation("") image ImageBlob
      @customAnnotation("") @customAnnotation("CassandraType.Name.DATE") @customAnnotation("") @customAnnotation("") addedDate LocalDate required
      @customAnnotation("") @customAnnotation("CassandraType.Name.BIGINT") @customAnnotation("UTC_DATETIME") @customAnnotation("") addedDateTime Long
    }
:::
::::

::: paragraph
**Prerequisites**:
:::

::: ulist
-   [Java](https://sdkman.io/) 21+

-   [Node.js](https://nodejs.com/) 20+

-   [Docker Desktop](https://www.docker.com/products/docker-desktop/)

-   [JHipster](https://www.jhipster.tech/installation/) 8.6.0
:::

:::: {#toc .toc}
::: {#toctitle .title}
Table of Contents
:::

-   [Build Java Microservices using the Cassandra Composite Primary Key
    Blueprint](#_build_java_microservices_using_the_cassandra_composite_primary_key_blueprint)
-   [Run your Cassandra Composite Primary Key Entities
    Example](#_run_your_cassandra_composite_primary_key_entities_example)
-   [Identity Providers](#_identity_providers)
-   [See the Code in Action](#_see_the_code_in_action)
-   [Have Fun with Micro Frontends and
    JHipster!](#_have_fun_with_micro_frontends_and_jhipster)
-   [Thank You](#_thank_you)
::::
:::::::::::
::::::::::::

::::: sect1
## Build Java Microservices using the Cassandra Composite Primary Key Blueprint {#_build_java_microservices_using_the_cassandra_composite_primary_key_blueprint}

:::: sectionbody
::: {.olist .arabic}
1.  To generate a microservices architecture with Cassandra composite
    primary key support, run the following command:

    :::: listingblock
    ::: content
    ``` {.highlightjs .highlight}
    sh saathratri-generate-code-dev-cassandra.sh
    ```
    :::
    ::::

2.  You should see the message:

    :::: listingblock
    ::: content
    ``` {.highlightjs .highlight}
    Congratulations, JHipster execution is complete!
    ```
    :::
    ::::
:::
::::
:::::

::::: sect1
## Run your Cassandra Composite Primary Key Entities Example {#_run_your_cassandra_composite_primary_key_entities_example}

:::: sectionbody
::: {.olist .arabic}
1.  When the process is complete, cd into the `gateway` directory and
    start Keycloak and Eureka using Docker Compose.

    :::: listingblock
    ::: content
    ``` {.highlightjs .highlight}
    cd gateway
    docker compose -f src/main/docker/keycloak.yml up -d
    docker compose -f src/main/docker/jhipster-registry.yml up -d
    ```
    :::
    ::::

2.  Start `gateway` database with Docker by opening a terminal and
    navigating to its directory and running the Docker command. Then
    start the `gateway` by running the Maven command.

    :::: listingblock
    ::: content
    ``` {.highlightjs .highlight}
    npm run docker:db:up
    ./mvnw spring-boot:run
    ```
    :::
    ::::

3.  Start `blog` database with Docker by opening a terminal and
    navigating to its directory and running the Docker command. Then,
    start the `blog` microservice.

    :::: listingblock
    ::: content
    ``` {.highlightjs .highlight}
    cd blog
    npm run docker:db:up
    ./mvnw spring-boot:run
    ```
    :::
    ::::

4.  Start `store` database with Docker by opening a terminal and
    navigating to its directory and running the Docker command. Then,
    start the `store` microservice.

    :::: listingblock
    ::: content
    ``` {.highlightjs .highlight}
    cd store
    npm run docker:db:up
    ./mvnw spring-boot:run
    ```
    :::
    ::::
:::
::::
:::::

::::::: sect1
## Identity Providers {#_identity_providers}

:::::: sectionbody
::: paragraph
JHipster ships with Keycloak when you choose OAuth 2.0 / OIDC as the
authentication type.
:::

::: paragraph
If you'd like to use Okta for your identity provider, see [JHipster's
documentation](https://www.jhipster.tech/security/#okta).
:::

::: {.admonitionblock .tip}
+-----------------------------------+-----------------------------------+
| ::: title                         | ::: paragraph                     |
| Tip                               | You can configure JHipster        |
| :::                               | quickly with the [Okta            |
|                                   | CLI](https://cli.okta.com):       |
|                                   | :::                               |
|                                   |                                   |
|                                   | :::: listingblock                 |
|                                   | ::: content                       |
|                                   | ``` {.highlightjs .highlight}     |
|                                   | okta apps create jhipster         |
|                                   | ```                               |
|                                   | :::                               |
|                                   | ::::                              |
+-----------------------------------+-----------------------------------+
:::
::::::
:::::::

:::::::: sect1
## See the Code in Action {#_see_the_code_in_action}

::::::: sectionbody
::: paragraph
Now you can open your favorite browser to
[http://localhost:8080](http://localhost:8080){.bare}, and log in with
the credentials displayed on the page.
:::

::: paragraph
Then create a Blog
:::

::: {.olist .arabic}
1.  Open your favorite browser to
    [http://localhost:8080](http://localhost:8080){.bare}, and log in
    with the credentials displayed on the page.

2.  Then, add a blog by giving it a name, handle and selecting a user.

3.  Add a tag by giving it a name.

4.  Finally, create a post by giving it a title, content, selecting a
    blog and a tag.
:::

::: paragraph
Notice the Blog entity shows the required category and blogId composite
primary key fields. That is success!
:::
:::::::
::::::::

::::::: sect1
## Have Fun with Micro Frontends and JHipster! {#_have_fun_with_micro_frontends_and_jhipster}

:::::: sectionbody
::: paragraph
I hope you enjoyed this demo, and it helped you understand how to build
better microservice architectures with composite primary keys.
:::

::: paragraph
☕️ Find the code on GitHub:
[https://github.com/amarpatel-xx/jhipster-cassandra-composite-primary-key-example-8-oss](https://github.com/amarpatel-xx/jhipster-cassandra-composite-primary-key-example-8-oss){.bare}
:::

::: paragraph
🤓 Read the following blog post, by Matt Raible, that was used as
inspiration for this project: [Micro Frontends for Java
Microservices](https://auth0.com/blog/micro-frontends-for-java-microservices/)
:::
::::::
:::::::

::::: sect1
## Thank You {#_thank_you}

:::: sectionbody
::: paragraph
Thank you to yelhouti
([https://github.com/yelhouti](https://github.com/yelhouti){.bare}),
Jeremy Artero
([https://www.linkedin.com/in/jeremyartero/](https://www.linkedin.com/in/jeremyartero/){.bare}),
Matt Raible
([https://github.com/mraible](https://github.com/mraible){.bare}), Gaël
Marziou
([https://github.com/gmarziou](https://github.com/gmarziou){.bare}),
Cedrick Lunven
([https://www.linkedin.com/in/clunven/](https://www.linkedin.com/in/clunven/){.bare}),
Christophe Bornet
([https://www.linkedin.com/in/christophe-bornet-bab1193/](https://www.linkedin.com/in/christophe-bornet-bab1193/){.bare}
), Disha Patel
([https://www.linkedin.com/in/dishapatel860/](https://www.linkedin.com/in/dishapatel860/){.bare})
and Catherine Guevara
([https://www.linkedin.com/in/catherine-guevara-1a5375b1/](https://www.linkedin.com/in/catherine-guevara-1a5375b1/){.bare})
for your invaluable contributions to this example and the underlying
JHipster blueprint.
:::
::::
:::::
::::::::::::::::::::::::::::::::::::::

:::: {#footer}
::: {#footer-text}
Last updated 2024-07-15 08:14:19 -0400
:::
::::
