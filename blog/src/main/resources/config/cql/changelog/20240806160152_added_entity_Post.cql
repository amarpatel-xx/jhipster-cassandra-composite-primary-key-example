
CREATE TABLE IF NOT EXISTS post (
    created_date bigint,
    added_date_time bigint,
    post_id uuid,
    title text,
    content text,
  primary key ((created_date), added_date_time, post_id))
  with clustering order by (added_date_time desc, post_id asc);

