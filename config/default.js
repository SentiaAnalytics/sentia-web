module.exports = {
  "port": process.env.PORT || 3000,
  "postgres": process.env.POSTGRES_URL,
  redis : process.env.REDISCLOUD_URL,
  session : {
    client : this.redis,
    prefix : 'session'
  }
};
