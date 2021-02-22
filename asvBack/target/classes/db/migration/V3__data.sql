INSERT INTO app_user
(id, birth_date, email, last_name, first_name, "password", phone, username)
VALUES(nextval('user_seq'), '1990-11-11 00:00:00.000', 'admin@email.com', 'admin' , 'administrator', '$2a$12$/6itOOF4p7Q9B7syAFykCuGsKd7LIhZz1wwIRq8e9O6DX0WmhJwiq', '666000111', 'admin');

INSERT INTO user_roles
(user_id, roles)
VALUES(1, 0);



INSERT INTO TEAM (id, name, country, shield_photo) VALUES (nextval('team_seq'), 'Real Madrid', 'Spain', 'realmadrid.jpg');
INSERT INTO TEAM (id, name, country, shield_photo) VALUES (nextval('team_seq'), 'Barcelona', 'Spain', 'barcelona.jpg' );
INSERT INTO TEAM (id, name, country, shield_photo) VALUES (nextval('team_seq'), 'Sevilla', 'Spain', 'sevilla.jpg');
INSERT INTO TEAM (id, name, country, shield_photo) VALUES (nextval('team_seq'), 'Betis', 'Spain', 'betis.jpg');
INSERT INTO TEAM (id, name, country, shield_photo) VALUES (nextval('team_seq'), 'Atlético de Madrid', 'Spain', 'atleticodemadrid.jpg');
INSERT INTO TEAM (id, name, country, shield_photo) VALUES (nextval('team_seq'), 'Villareal', 'Spain', 'villareal.jpg');
INSERT INTO TEAM (id, name, country, shield_photo) VALUES (nextval('team_seq'), 'Real Sociedad', 'Spain', 'realsociedad.jpg');
INSERT INTO TEAM (id, name, country, shield_photo) VALUES (nextval('team_seq'), 'Granada', 'Spain', 'granada.jpg');
INSERT INTO TEAM (id, name, country, shield_photo) VALUES (nextval('team_seq'), 'Levante', 'Spain', 'levante.jpg');
INSERT INTO TEAM (id, name, country, shield_photo) VALUES (nextval('team_seq'), 'Celta', 'Spain', 'celta.jpg');
INSERT INTO TEAM (id, name, country, shield_photo) VALUES (nextval('team_seq'), 'Athletic', 'Spain', 'athletic.jpg');
INSERT INTO TEAM (id, name, country, shield_photo) VALUES (nextval('team_seq'), 'Getafe', 'Spain', 'getafe.jpg');
INSERT INTO TEAM (id, name, country, shield_photo) VALUES (nextval('team_seq'), 'Cádiz', 'Spain', 'cadiz.jpg');
INSERT INTO TEAM (id, name, country, shield_photo) VALUES (nextval('team_seq'), 'Valencia', 'Spain', 'valencia.jpg');
INSERT INTO TEAM (id, name, country, shield_photo) VALUES (nextval('team_seq'), 'Alavés', 'Spain', 'alaves.jpg');
INSERT INTO TEAM (id, name, country, shield_photo) VALUES (nextval('team_seq'), 'Eibar', 'Spain', 'eibar.jpg');
INSERT INTO TEAM (id, name, country, shield_photo) VALUES (nextval('team_seq'), 'Valladolid', 'Spain', 'valladolid.jpg');
INSERT INTO TEAM (id, name, country, shield_photo) VALUES (nextval('team_seq'), 'Osasuna', 'Spain', 'osasuna.jpg');
INSERT INTO TEAM (id, name, country, shield_photo) VALUES (nextval('team_seq'), 'Elche', 'Spain', 'elche.jpg');
INSERT INTO TEAM (id, name, country, shield_photo) VALUES (nextval('team_seq'), 'Huesca', 'Spain', 'huesca.jpg');

UPDATE TEAM SET hist_rival_team = 2 WHERE id = 1;
UPDATE TEAM SET hist_rival_team = 1 WHERE id = 2;
UPDATE TEAM SET hist_rival_team = 3 WHERE id = 4;
UPDATE TEAM SET hist_rival_team = 4 WHERE id = 3;
UPDATE TEAM SET hist_rival_team = 7 WHERE id = 11;
UPDATE TEAM SET hist_rival_team = 11 WHERE id = 7;
UPDATE TEAM SET hist_rival_team = 1 WHERE id = 5;
UPDATE TEAM SET hist_rival_team = 6 WHERE id = 8;
UPDATE TEAM SET hist_rival_team = 8 WHERE id = 6;
UPDATE TEAM SET hist_rival_team = 9 WHERE id = 10;
UPDATE TEAM SET hist_rival_team = 10 WHERE id = 9;
UPDATE TEAM SET hist_rival_team = 12 WHERE id = 13;
UPDATE TEAM SET hist_rival_team = 13 WHERE id = 12;
UPDATE TEAM SET hist_rival_team = 14 WHERE id = 15;
UPDATE TEAM SET hist_rival_team = 15 WHERE id = 14;
UPDATE TEAM SET hist_rival_team = 16 WHERE id = 17;
UPDATE TEAM SET hist_rival_team = 17 WHERE id = 16;
UPDATE TEAM SET hist_rival_team = 18 WHERE id = 19;
UPDATE TEAM SET hist_rival_team = 19 WHERE id = 18;
UPDATE TEAM SET hist_rival_team = 9 WHERE id = 20;



INSERT INTO competition
(id, competition_year, winner, "name")
VALUES(nextval('competition_seq'), 2018, 1, 'Champions League');
INSERT INTO competition
(id, competition_year, winner, "name")
VALUES(nextval('competition_seq'), 2017, 1, 'Champions League');
INSERT INTO competition
(id, competition_year, winner, "name")
VALUES(nextval('competition_seq'), 2016, 1, 'Champions League');
INSERT INTO competition
(id, competition_year, winner, "name")
VALUES(nextval('competition_seq'), 2014, 1, 'Champions League');
INSERT INTO competition
(id, competition_year, winner, "name")
VALUES(nextval('competition_seq'), 2015, 2, 'Champions League');


INSERT INTO competition
(id, competition_year, winner, "name")
VALUES(nextval('competition_seq'), 2020, 1, 'La Liga');

INSERT INTO competition
(id, competition_year, winner, "name")
VALUES(nextval('competition_seq'), 2019, 2, 'La Liga');

INSERT INTO competition
(id, competition_year, winner, "name")
VALUES(nextval('competition_seq'), 2018, 2, 'Copa del Rey');


INSERT INTO journey_competition
(journey, id)
VALUES('38', 6);

INSERT INTO journey_competition
(journey, id)
VALUES('38', 7);


INSERT INTO playoff_competition
(playoff, id)
VALUES('8', 8);


INSERT INTO playoff_journey_competition
(journey, playoff, id)
VALUES('6', '4', 1);
INSERT INTO playoff_journey_competition
(journey, playoff, id)
VALUES('6', '4', 2);
INSERT INTO playoff_journey_competition
(journey, playoff, id)
VALUES('6', '4', 3);
INSERT INTO playoff_journey_competition
(journey, playoff, id)
VALUES('6', '4', 4);
INSERT INTO playoff_journey_competition
(journey, playoff, id)
VALUES('6', '4', 5);


INSERT INTO team_competition
(team_id, competition_id)
VALUES(1, 1);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(2, 1);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(3, 1);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(5, 1);

INSERT INTO team_competition
(team_id, competition_id)
VALUES(1, 2);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(2, 2);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(3, 2);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(5, 2);

INSERT INTO team_competition
(team_id, competition_id)
VALUES(1, 3);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(2, 3);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(3, 3);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(5, 3);


INSERT INTO team_competition
(team_id, competition_id)
VALUES(1, 4);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(2, 4);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(3, 4);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(5, 4);


INSERT INTO team_competition
(team_id, competition_id)
VALUES(1, 5);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(2, 5);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(3, 5);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(5, 5);


INSERT INTO team_competition
(team_id, competition_id)
VALUES(1, 6);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(2, 6);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(3, 6);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(5, 6);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(6, 6);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(7, 6);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(8, 6);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(9, 6);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(10, 6);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(11, 6);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(12, 6);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(13, 6);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(14, 6);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(15, 6);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(16, 6);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(17, 6);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(18, 6);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(19, 6);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(20, 6);

INSERT INTO team_competition
(team_id, competition_id)
VALUES(1, 7);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(2, 7);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(3, 7);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(5, 7);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(6, 7);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(7, 7);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(8, 7);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(9, 7);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(10, 7);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(11, 7);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(12, 7);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(13, 7);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(14, 7);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(15, 7);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(16, 7);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(17, 7);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(18, 7);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(19, 7);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(20, 7);


INSERT INTO team_competition
(team_id, competition_id)
VALUES(1, 8);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(2, 8);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(3, 8);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(5, 8);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(6, 8);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(7, 8);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(8, 8);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(9, 8);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(10, 8);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(11, 8);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(12, 8);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(13, 8);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(14, 8);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(15, 8);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(16, 8);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(17, 8);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(18, 8);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(19, 8);
INSERT INTO team_competition
(team_id, competition_id)
VALUES(20, 8);









