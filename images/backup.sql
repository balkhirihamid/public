CREATE TABLE IF NOT EXISTS product (id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL, img TEXT, qte INTEGER, prix REAL, achat REAL);
INSERT OR IGNORE INTO "product" ("id", "name", "img", "qte", "prix", "achat") VALUES ('ranger-2', 'camera imou ranger 2mp', '/data/user/999/com.hamid.tender/app_flutter/1753113259935.webp', '10', '350.0', '300.0');
INSERT OR IGNORE INTO "product" ("id", "name", "img", "qte", "prix", "achat") VALUES ('cell-pt-4g', 'Cell PT 4G Camera 2K PTZ 15A batterie 🔋', '/data/user/999/com.hamid.tender/app_flutter/1753175691993.webp', '10', '1500.0', '1400.0');
INSERT OR IGNORE INTO "product" ("id", "name", "img", "qte", "prix", "achat") VALUES ('cruiser-z', 'Cruiser Z double lent 5MP 3K PTZ zoom X12', '/data/user/999/com.hamid.tender/app_flutter/1753175977445.webp', '10', '1400.0', '1300.0');
INSERT OR IGNORE INTO "product" ("id", "name", "img", "qte", "prix", "achat") VALUES ('cell-go', 'Cell Go 2K 5000mA ', '/data/user/999/com.hamid.tender/app_flutter/1753176167204.webp', '10', '1000.0', '900.0');
INSERT OR IGNORE INTO "product" ("id", "name", "img", "qte", "prix", "achat") VALUES ('rex-vt', 'Rex VT 3K QHD appel vidéo rotative 360 ', '/data/user/999/com.hamid.tender/app_flutter/1753182599629.webp', '10', '900.0', '800.0');
CREATE TABLE IF NOT EXISTS pub (id integer PRIMARY KEY autoincrement, name TEXT, descr TEXT, img TEXT, cat TEXT default 'pub');
INSERT OR IGNORE INTO "pub" ("id", "name", "descr", "img", "cat") VALUES ('1', 'Surveillance et sécurité ', 'sécurisé votre famille avec nos produits utiles pour une incroyable expérience ', '/data/user/999/com.hamid.tender/app_flutter/1753185436499.webp', 'pub');
INSERT OR IGNORE INTO "pub" ("id", "name", "descr", "img", "cat") VALUES ('2', 'Surveillance et sécurité ', 'préparer vous a une expérience professionnelle ', '/data/user/999/com.hamid.tender/app_flutter/1753185483850.webp', 'pub');
INSERT OR IGNORE INTO "pub" ("id", "name", "descr", "img", "cat") VALUES ('3', NULL, 'https://youtu.be/TsAes5-saWc?si=CCqeiWafWN8XzDxA', NULL, 'url');
INSERT OR IGNORE INTO "pub" ("id", "name", "descr", "img", "cat") VALUES ('4', NULL, 'https://youtu.be/Zp5BOzL2WG4?si=DAuDjjvO_Kw9NPJc', NULL, 'url');
CREATE TABLE IF NOT EXISTS client(id integer PRIMARY KEY autoincrement, name TEXT, phone TEXT unique, company TEXT unique);
INSERT OR IGNORE INTO "client" ("id", "name", "phone", "company") VALUES ('1', 'Abbassi', '+212662080579', '00152355477');
CREATE TABLE IF NOT EXISTS noteline (id integer PRIMARY KEY autoincrement, noteid INTEGER, customer integer NOT NULL, descript TEXT not null, price REAL, Qte REAL, unit TEXT, FOREIGN key (customer) REFERENCES client (id) on DELETE CASCADE on UPDATE CASCADE);
CREATE TABLE IF NOT EXISTS company (id integer PRIMARY KEY, uri TEXT, type TEXT, name TEXT, ville TEXT, mail TEXT, tel integer, site TEXT, ice TEXT, cnss TEXT, ife TEXT);
CREATE TABLE IF NOT EXISTS diplome(id integer PRIMARY KEY autoincrement, content TEXT, est TEXT, date TEXT, type TEXT, active integer(1) default 1);
CREATE TABLE IF NOT EXISTS project(id integer PRIMARY KEY autoincrement, description TEXT, date TEXT, url TEXT, active integer(1) default 1);
CREATE TABLE IF NOT EXISTS devis (id integer PRIMARY KEY autoincrement, date TEXT, ref TEXT UNIQUE, description TEXT, prix REAL, qte REAL, client INTEGER , FOREIGN KEY (client) REFERENCES client(id) on UPDATE CASCADE on DELETE CASCADE);
INSERT OR IGNORE INTO "devis" ("id", "date", "ref", "description", "prix", "qte", "client") VALUES ('1', '2025-07-27 01:11:24.252260', NULL, 'camera imou 4mp', '200.0', '6.0', '1');
INSERT OR IGNORE INTO "devis" ("id", "date", "ref", "description", "prix", "qte", "client") VALUES ('2', '2025-07-27 01:11:24.252260', NULL, 'camera imou 4mp', '200.0', '6.0', '1');
INSERT OR IGNORE INTO "devis" ("id", "date", "ref", "description", "prix", "qte", "client") VALUES ('3', '2025-07-27 01:11:24.252260', NULL, 'camera imou 4mp', '200.0', '6.0', '1');
INSERT OR IGNORE INTO "devis" ("id", "date", "ref", "description", "prix", "qte", "client") VALUES ('4', '2025-07-27 01:11:24.252260', NULL, 'camera imou 4mp', '200.0', '6.0', '1');
INSERT OR IGNORE INTO "devis" ("id", "date", "ref", "description", "prix", "qte", "client") VALUES ('5', '2025-07-27 01:11:24.252260', NULL, 'camera imou 4mp', '200.0', '6.0', '1');
INSERT OR IGNORE INTO "devis" ("id", "date", "ref", "description", "prix", "qte", "client") VALUES ('6', '2025-07-27 01:11:24.252260', NULL, 'camera imou 4mp m3', '250.0', '5.0', '1');
CREATE VIEW IF NOT EXISTS dcount as select client, date from devis group by date;

/* /data/user/999/com.hamid.tender/app_flutter/20250721165017765993.webp; {"name":"hamid el balkhiri","phone":"641550703","mail":"balkhirihamid@gmail.com","date":"1994-02-03","about":"web and mobile applications developer and database designer ","adresse":"ennajah tamesna, Rabat"}; null; null; null; {"name":"Tender","patent":"","rc":"","ville":"","mail":"","tel":"+212641550703","site":"","ice":"","cnss":"","ife":""} /*/data/user/999/com.hamid.tender/app_flutter

