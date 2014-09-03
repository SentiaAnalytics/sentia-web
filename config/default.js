module.exports = {
  "port": process.env.PORT || 3000,
  "postgres": {
    "database": "sentia",
    "host": "sentia.clto0ldvohgx.eu-west-1.rds.amazonaws.com",
    "user": "sentia",
    "password": process.env.POSTGRES_PASS,
    "port": 5432,
    "ssl": true
  },
  redis : process.env.REDISCLOUD_URL,
  session : {
    client : this.redis,
    prefix : 'session'
  }
};
