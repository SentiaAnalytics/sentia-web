docker run \
  -d \
  -p 3000:3000 \
  -e MONGOLAB_URI= $MONGOLAB_URI \
  -e MYSQL_URL=$MYSQL_URL \
  -e REDISCLOUD_URL=$REDISCLOUD_URL \
  cullophid/sentia:$CIRCLE_BUILD_NUM
