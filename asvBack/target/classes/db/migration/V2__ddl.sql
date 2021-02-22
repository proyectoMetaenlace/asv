CREATE SEQUENCE team_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE user_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE competition_seq START WITH 1 INCREMENT BY 1;


-- Drop table

-- DROP TABLE public.app_user;

CREATE TABLE app_user (
	id int8 NOT NULL,
	birth_date timestamp NULL,
	email varchar(255) NOT NULL,
	last_name varchar(255) NULL,
	first_name varchar(255) NULL,
	"password" varchar(255) NOT NULL,
	phone varchar(255) NULL,
	username varchar(255) NOT NULL,
	CONSTRAINT app_user_pkey PRIMARY KEY (id),
	CONSTRAINT uk_3k4cplvh82srueuttfkwnylq0 UNIQUE (username)
);

-- Drop table

-- DROP TABLE public.team;

CREATE TABLE team (
	id int8 NOT NULL,
	country varchar(255) NOT NULL,
	hist_rival_team int8 NULL,
	"name" varchar(255) NOT NULL,
	shield_photo varchar(255) NULL,
	CONSTRAINT team_pkey PRIMARY KEY (id),
	CONSTRAINT uk_g2l9qqsoeuynt4r5ofdt1x2td UNIQUE (name),
	CONSTRAINT fki47ff0j0itn91nldii6ovtp95 FOREIGN KEY (hist_rival_team) REFERENCES team(id)
);

-- Drop table

-- DROP TABLE public.competition;

CREATE TABLE competition (
	id int8 NOT NULL,
	competition_year int4 NOT NULL,
	winner int8 NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT competition_pkey PRIMARY KEY (id),
	CONSTRAINT fk2kx8rjfg15qlwwum32get64nu FOREIGN KEY (winner) REFERENCES team(id)
);

-- Drop table

-- DROP TABLE public.journey_competition;

CREATE TABLE journey_competition (
	journey varchar(255) NULL,
	id int8 NOT NULL,
	CONSTRAINT journey_competition_pkey PRIMARY KEY (id),
	CONSTRAINT fk8xyhncmd57fbwviwc90f3h3mj FOREIGN KEY (id) REFERENCES competition(id)
);

-- Drop table

-- DROP TABLE public.playoff_competition;

CREATE TABLE playoff_competition (
	playoff varchar(255) NULL,
	id int8 NOT NULL,
	CONSTRAINT playoff_competition_pkey PRIMARY KEY (id),
	CONSTRAINT fk1dwn13an4sto917lrficsxa6d FOREIGN KEY (id) REFERENCES competition(id)
);

-- Drop table

-- DROP TABLE public.playoff_journey_competition;

CREATE TABLE playoff_journey_competition (
	journey varchar(255) NULL,
	playoff varchar(255) NULL,
	id int8 NOT NULL,
	CONSTRAINT playoff_journey_competition_pkey PRIMARY KEY (id),
	CONSTRAINT fk3jjeo15mt8ve6nqslwjr36m6j FOREIGN KEY (id) REFERENCES competition(id)
);

-- Drop table

-- DROP TABLE public.team_competition;

CREATE TABLE team_competition (
	team_id int8 NOT NULL,
	competition_id int8 NOT NULL,
	CONSTRAINT team_competition_pkey PRIMARY KEY (team_id, competition_id),
	CONSTRAINT fkegrcyt175igj8599hpv5hk5b FOREIGN KEY (competition_id) REFERENCES competition(id),
	CONSTRAINT fkk9fuvx4optv4p5tlmnw3lof5a FOREIGN KEY (team_id) REFERENCES team(id)
);


-- Drop table

-- DROP TABLE public.user_roles;

CREATE TABLE user_roles (
                                         user_id int8 NOT NULL,
                                         roles int8 NOT NULL
);


