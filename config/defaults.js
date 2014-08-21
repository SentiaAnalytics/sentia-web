module.eports = {
  "port": 3000,
  "postgres": {
    "database": "sentia",
    "host": "sentia.clto0ldvohgx.eu-west-1.rds.amazonaws.com",
    "user": "sentia",
    "password": process.env.SENTIA_DB_PASS,
    "port": 5432,
    "ssl": true
  }
};
