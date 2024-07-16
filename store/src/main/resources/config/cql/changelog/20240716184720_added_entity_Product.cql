
CREATE TABLE IF NOT EXISTS product (
    id uuid,
    title text,
    price decimal,
    image blob,
    image_content_type text,
    addedDate date,
    addedDateTime bigint,
    PRIMARY KEY(id)
);
