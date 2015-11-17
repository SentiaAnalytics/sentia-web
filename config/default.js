
module.exports = {
  "port": process.env.PORT || 3000,
  "mongo": process.env.MONGOLAB_URI,
  "mysql": process.env.MYSQL_URL,
  redis: {
    host : process.env.REDIS_PORT_6379_TCP_ADDR,
    port: process.env.REDIS_PORT_6379_TCP_PORT
  },
  gcloud: {
    credentials: JSON.parse(process.env.GCLOUD_CREDENTIALS || '{}')
  },
  environment: process.env.NODE_ENV || 'production'
};
