cd gateway
ttab docker compose -f src/main/docker/keycloak.yml up -d
ttab docker compose -f src/main/docker/jhipster-registry.yml up -d
cd ..

cd gateway
npm run docker:db:up
ttab ./mvnw spring-boot:run
cd ..

cd blog
npm run docker:db:up
echo "Deploying Blog Service..."
ttab ./mvnw spring-boot:run -Dspring.profiles.active='dev,no-liquibase' -Dspring-boot.run.jvmArguments="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8004"
cd ..

cd store
npm run docker:db:up
echo "Deploying Store Service..."
ttab ./mvnw spring-boot:run -Dspring.profiles.active='dev,no-liquibase' -Dspring-boot.run.jvmArguments='-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8008'
cd ..
