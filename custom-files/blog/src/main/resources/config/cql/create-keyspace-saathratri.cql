CREATE KEYSPACE IF NOT EXISTS blog
    WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 }
    AND DURABLE_WRITES = true;

CREATE TABLE IF NOT EXISTS blog.schema_version (
    script_name text,
    checksum text,
    executed_by text,
    executed_on timestamp,
    execution_time int,
    status text,
    PRIMARY KEY(script_name)
);

DROP TABLE blog.blog;

-- Create the blog.blog table
CREATE TABLE blog.blog (
    category text,
    blog_id uuid,
    handle text,
    content text,
    PRIMARY KEY ((category), blog_id)
) WITH CLUSTERING ORDER BY (blog_id ASC);

DROP TABLE blog.taj_user;

-- Create the blog.taj_user table
CREATE TABLE blog.taj_user (
    id uuid,
    login text,
    PRIMARY KEY (id)
);

DROP TABLE blog.post;

-- Create the blog.post table
CREATE TABLE blog.post (
    created_date bigint,
    added_date_time bigint,
    post_id uuid,
    title text,
    content text,
    PRIMARY KEY ((created_date), added_date_time, post_id)
) WITH CLUSTERING ORDER BY (
    added_date_time DESC,
    post_id ASC
);

DROP TABLE blog.tag;

-- Create the blog.tag table
CREATE TABLE blog.tag (
    id uuid,
    name text,
    PRIMARY KEY (id)
);
