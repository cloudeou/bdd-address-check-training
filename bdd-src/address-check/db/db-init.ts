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
    ip_address varchar(15) not null,
    ip_lat double precision,
    ip_lon double precision,
    address_lat double precision,
    address_lon double precision,
    processing boolean default false,
    processed  boolean default false,
    error text,
    env text,
    created_date timestamp default now(),
    updated_date timestamp default now()
);
`