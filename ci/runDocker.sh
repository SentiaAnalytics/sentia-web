docker run \
  -d \
  -p 3000:3000 \
  -e MONGOLAB_URI=mongodb://heroku_app29196195:7cj4e5276l95m73ekpoqqgbm0i@ds063769.mongolab.com:63769/heroku_app29196195 \
  -e MYSQL_URL=mysql://root:sqlaboutsafe@173.194.254.87:3306/sentia \
  -e REDISCLOUD_URL=redis://rediscloud:S0yE1FbtKmsbElYP@pub-redis-16319.eu-west-1-1.2.ec2.garantiadata.com:16319 \
  gcr.io/sentia_analytics/web:$CIRCLE_BUILD_NUM
