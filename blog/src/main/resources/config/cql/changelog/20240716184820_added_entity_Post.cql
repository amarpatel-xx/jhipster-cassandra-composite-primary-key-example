
CREATE TABLE IF NOT EXISTS post (
    createdDate bigint,
    addedDateTime bigint,
    postId uuid,
    title text,
    content text,
    PRIMARY KEY(id)
);
