var redisUrl = 'redis://' + process.env.REDIS_PORT_6379_TCP_ADDR + ':' + process.env.REDIS_PORT_6379_TCP_PORT

module.exports = {
  "port": process.env.PORT || 3000,
  "mongo": process.env.MONGOLAB_URI,
  "mysql": process.env.MYSQL_URL,
  redis: redisUrl,
  session: {
    client: redisUrl,
    prefix: 'session'
  },
  gcloud: {
    credentials: JSON.parse(process.env.GCLOUD_CREDENTIALS || '{}')
  },
  environment: process.env.NODE_ENV || 'production'
};
