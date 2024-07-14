CREATE KEYSPACE IF NOT EXISTS store
    WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 }
    AND DURABLE_WRITES = true;

CREATE TABLE IF NOT EXISTS store.schema_version (
    script_name text,
    checksum text,
    executed_by text,
    executed_on timestamp,
    execution_time int,
    status text,
    PRIMARY KEY(script_name)
);

DROP TABLE store.product;

-- Create the store.product table
CREATE TABLE store.product (
    id uuid,
    title text,
    price decimal,
    image blob,
    added_date date,
    added_date_time bigint,
    image_content_type text,
    PRIMARY KEY (id)
);