module.exports = {
  "port": process.env.PORT || 3000,
  "mongo" : process.env.MONGOLAB_URI,
  "mysql" : process.env.MYSQL_URL,
  redis : process.env.REDISCLOUD_URL,
  session : {
    client : this.redis,
    prefix : 'session'
  },
  gcloud : {
    private_key : process.env.GCLOUD_PRIVATE_KEY
  }
};
