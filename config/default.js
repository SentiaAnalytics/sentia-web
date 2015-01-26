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
    credentials :  JSON.parse(process.env.GCLOUD_CREDENTIALS || '{}')
  }
};
