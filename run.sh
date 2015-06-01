#docker run \
#        -p 80:3000 \
#        -e GCLOUD_CREDENTIALS="{"private_key":"-----BEGIN PRIVATE KEY----- MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAMbkCemORmS364+r bP2qtDRaNA8UQ3cJvlp3rGf4wseDAZbeC6lDqcoLPeewQBTh8I3cPdmrt3BctjXC cN0n9JcSNQiqlOwKZ/K/0hQ1qzWETeoei0ezOF1GZdbgXi+oi/BKlWS325GbHZf+ +5Nb34BSBDov8IQoWsfiEba/obWFAgMBAAECgYAlRfM9m/ZBRd6VjDDe0TD4Zrc+ 5DNIicDsv2TGD26haUHQ/kf9LrsRLE4rr3Iy96zXSSEmO/Ii0p0rMgdoyuYhXQeG Z0hkkqICHXEd9bx1HRjL2engnNhEnNYWPCCF1YNz7v8wjgiZQhhv/x6qMxaiFny1 hpTym6WjPR3X5K4CwQJBAO7izsn/lnaSIIKLZbCamFn7bv2Z1tR0xlnFG902L93u Ie41bYABgdsDnllSqU9zELdCfACkxf+nKZ7yxpAMPJ0CQQDVI7cWl9apKrjdCWoN ShUmXSISBltYOL3LmN772GC2icQjXYP4QUsZJrrAKLL8MKHbEDKW9i0eEPqKohsy K6QJAkBt8EG84vyLCwsdKSwej7dHyhg1bCRbWHakf7soHjT/TQWejEYdoBP0CIFK mGlFIC50OIu6/BoHYxYbiZ1qU8ddAkEApXWAYG2nGtQrhowUZBSqromGNW/x4V7L GA6oq+Gh0pLITJwAIuytG+1Q9HOj3tryC1lbrI2XIMwVcyG88wml4QJAIn70hv07 LwOeWN//+8F8NJUoqIb8WeDEx8fpIMlbUtE7D0rbeXQzRVFHIIaQ+ayQs0EfXRMd tOyhDd0ho7mi9Q== -----END PRIVATE KEY----- ","client_email":"932979765667-4a0p1c3dkl64t9iqap4l674g7b91nd91@developer.gserviceaccount.com"}" \
#        -e REDISCLOUD_URL="redis://rediscloud:S0yE1FbtKmsbElYP@pub-redis-16319.eu-west-1-1.2.ec2.garantiadata.com:16319" \
#        -e MONGOLAB_URI="mongodb://heroku_app29196195:7cj4e5276l95m73ekpoqqgbm0i@ds063769.mongolab.com:63769/heroku_app29196195" \
#        -e MYSQL_URL="mysql://root:sqlaboutsafe@173.194.254.87:3306/sentia" \
#        gcr.io/sentia-analytics/web:react.11


docker run \
        -p 80:3000 \
        -e REDISCLOUD_URL="redis://rediscloud:S0yE1FbtKmsbElYP@pub-redis-16319.eu-west-1-1.2.ec2.garantiadata.com:16319" \
        -e MONGOLAB_URI="mongodb://heroku_app29196195:7cj4e5276l95m73ekpoqqgbm0i@ds063769.mongolab.com:63769/heroku_app29196195" \
        -e MYSQL_URL="mysql://root:sqlaboutsafe@173.194.254.87:3306/sentia" \
        gcr.io/sentia-analytics/web:react.11

