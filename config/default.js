console.log('**********************');
console.log(process.env.MONGOLAB_URI);
console.log(process.env.MYSQL_URL);
console.log(process.env.REDISCLOUD_URL);
console.log(process.env.GCLOUD_CREDENTIALS);
console.log('**********************');

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
    credentials :  JSON.parse(process.env.GCLOUD_CREDENTIALS)
  }
};
