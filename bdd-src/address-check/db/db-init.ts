export default `
create table users (
    id SERIAL PRIMARY KEY,
    first_name varchar(100),
    last_name varchar(100),
    env text,
    created_date timestamp default now(),
    updated_date timestamp default now()
);

create table addresses (
    id SERIAL PRIMARY KEY,
    user_id int8 constraint fk_addresses_users REFERENCES users(id),
    address_text text not null,
    ip_address inet not null,
    ip_lat int8,
    ip_lon int8,
    address_lat int8,
    address_lon int8,
    processing boolean,
    processed  boolean,
    error text,
    env text,
    created_date timestamp default now(),
    updated_date timestamp default now()
);
`