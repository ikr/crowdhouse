create table "Investor" (
  id integer not null,
  name text not null,
  password_hash text not null,
  last_password_change timestamp with time zone not null,
  constraint pk_airport primary key (id)
)
