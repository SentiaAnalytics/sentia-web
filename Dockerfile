FROM google/nodejs

WORKDIR /app
ADD package.json /app/
RUN npm install --prod
ADD . /app

EXPOSE 3000
CMD []
ENTRYPOINT ["/nodejs/bin/npm", "start"]
