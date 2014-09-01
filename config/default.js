module.exports = {
  "port": 3000,
  "postgres": {
    "database": "sentia",
    "host": "sentia.clto0ldvohgx.eu-west-1.rds.amazonaws.com",
    "user": "sentia",
    "password": process.env.POSTGRES_PASS,
    "port": 5432,
    "ssl": true
  },
  session : {
    host : 'hoki.redistogo.com',
    port : 10774,
    prefix : 'session',
    pass : process.env.REDIS_PASS
  }
};
