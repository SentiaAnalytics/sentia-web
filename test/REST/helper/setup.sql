CREATE TABLE IF NOT EXISTS "user"
(
  email text,
  company integer,
  password text,
  firstname text,
  lastname text,
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  "createdAt" timestamp with time zone,
  "updatedAt" timestamp with time zone
);
CREATE TABLE camera
(
  company integer,
  store integer,
  name text,
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  "createdAt" timestamp with time zone,
  "updatedAt" timestamp with time zone,
  cols integer,
  rows integer
);


INSERT INTO "user" (email, password, company) VALUES ('user@example.com', '$2a$10$fOxtN.6VVHMAI6kF4lgM5uQG2PTrelR0D1a6iSuHhKkOaMvrPAoKi', 1);

INSERT INTO "camera" (company, store, name, cols, rows) VALUES (1, 1, 'Camera 1', 100, 100);
