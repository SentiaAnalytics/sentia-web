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
INSERT INTO "user" (email, password) VALUES ('user@example.com', '$2a$10$fOxtN.6VVHMAI6kF4lgM5uQG2PTrelR0D1a6iSuHhKkOaMvrPAoKi');
